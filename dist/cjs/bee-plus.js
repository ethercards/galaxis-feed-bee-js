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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const api_1 = __importDefault(require("./api"));
const ethers_1 = require("ethers");
class BeePlus extends bee_js_1.Bee {
    static create(beeUrl, batchId) {
        return new BeePlus(beeUrl || process.env.BEE_URL || '', batchId || process.env.BATCH_ID || '');
    }
    static initWallet() {
        const packageName = 'galaxis-feed-be-js';
        const configDir = path_1.default.resolve(process.cwd(), '.config', packageName);
        const walletFilePath = path_1.default.join(configDir, 'wallet.json');
        if (!fs_1.default.existsSync(configDir)) {
            fs_1.default.mkdirSync(configDir, { recursive: true });
            console.log(`Created directory: ${configDir}`);
        }
        let wallet;
        if (fs_1.default.existsSync(walletFilePath)) {
            const walletData = fs_1.default.readFileSync(walletFilePath, 'utf-8');
            wallet = JSON.parse(walletData);
        }
        else {
            wallet = ethers_1.Wallet.createRandom();
            const walletData = JSON.stringify({ address: wallet.address, privateKey: wallet.privateKey });
            fs_1.default.writeFileSync(walletFilePath, walletData, 'utf-8');
        }
        console.log('Wallet:', wallet);
        return wallet;
    }
    constructor(beeUrl, batchId) {
        if (!beeUrl || !batchId) {
            throw new Error('Bee URL and batch ID are required');
        }
        const wallet = BeePlus.initWallet();
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
            const api = new api_1.default();
            const response = yield api.createPostageBatch(amount, depthNumber);
            console.log('Postage batch created:', response);
            return response;
        });
    }
    fetchPostageBatch() {
        return __awaiter(this, void 0, void 0, function* () {
            const api = new api_1.default();
            const response = yield api.fetchPostageBatch(this.postageBatchId);
            return response;
        });
    }
    upload(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileName = path_1.default.basename(file);
            const data = fs_1.default.readFileSync(file);
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
            const topic = this.makeFeedTopic(rawTopic);
            console.log('Feed topic:', topic);
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
