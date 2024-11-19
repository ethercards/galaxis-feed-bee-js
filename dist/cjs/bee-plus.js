"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bee_js_1 = require("@ethersphere/bee-js");
const config_1 = __importDefault(require("./config"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const api_1 = __importDefault(require("./api"));
const ethers_1 = require("ethers");
class BeePlus extends bee_js_1.Bee {
    static create(beeUrl, batchId) {
        return new BeePlus(beeUrl || process.env.BEE_URL || '', batchId || process.env.BATCH_ID || '');
    }
    constructor(beeUrl, batchId) {
        if (!beeUrl || !batchId) {
            throw new Error('Bee URL and batch ID are required');
        }
        const wallet = ethers_1.Wallet.createRandom();
        let options = {
            signer: wallet.privateKey
        };
        super(beeUrl, options);
        this.keyData = { owner: '', signer: '' };
        this.postageBatchId = '';
        this.manifestReference = '';
        this.wallet = null;
        this.wallet = wallet;
        this.postageBatchId = batchId;
    }
    createPostageBatch(amount, depth) {
        return __awaiter(this, void 0, void 0, function* () {
            const depthNumber = Number(depth);
            if (isNaN(Number(amount)) || isNaN(depthNumber)) {
                throw new Error('Amount and depth must be convert to numbers');
            }
            const response = yield api_1.default.createPostageBatch(amount, depthNumber);
            this._writePostageBatchToFile(config_1.default.postageBatchPath, response);
            this.refreshPostageBatch();
            console.log('Postage batch created:', response);
            return response;
        });
    }
    fetchPostageBatch() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield api_1.default.fetchPostageBatch(this.postageBatchId);
            return response;
        });
    }
    _writePostageBatchToFile(filePath, postageBatch) {
        fs_1.default.writeFileSync(filePath, JSON.stringify(postageBatch, null, 2));
    }
    _getPostageBatchFromFile(filePath) {
        const fileContent = fs_1.default.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent);
    }
    refreshPostageBatch() {
        this.postageBatchId = this._getPostageBatchFromFile(config_1.default.postageBatchPath).batchID;
    }
    upload(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileName = path_1.default.basename(file);
            const fileDir = path_1.default.dirname(file);
            const filePath = path_1.default.join(__dirname, file);
            console.log('filePath:', filePath);
            const data = fs_1.default.readFileSync(filePath);
            const result = yield this.uploadFile(this.postageBatchId, data, fileName);
            console.log('Upload file result:', result);
            return result;
        });
    }
    // usage: writeFeed('file.txt', '/my-topic')
    writeFeed(file, rawTopic) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!this.wallet) {
                throw new Error('Wallet not found');
            }
            const fileName = path_1.default.basename(file);
            console.log('fileName:', fileName);
            const topic = this.makeFeedTopic(rawTopic);
            const result = yield this.upload(file);
            const feedWriter = this.makeFeedWriter('sequence', topic);
            const response = yield feedWriter.upload(this.postageBatchId, result.reference);
            console.log('Feed writer response:', response);
            const manifestReference = yield this.createFeedManifest(this.postageBatchId, 'sequence', topic, (_a = this.wallet) === null || _a === void 0 ? void 0 : _a.address);
            //const resultUrl = `/bzz/${(await this.createFeedManifest(this.postageBatchId, 'sequence', topic, this.wallet?.address)).reference}${rawTopic}`
            const resultUrl = `/bzz/${manifestReference.reference}${rawTopic}`;
            console.log('Feed URL:', resultUrl);
            return resultUrl;
        });
    }
}
exports.default = BeePlus;
