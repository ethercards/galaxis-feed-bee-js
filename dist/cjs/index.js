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
exports.buy = buy;
exports.feed = feed;
exports.uploadFile = uploadFile;
exports.uploadFilesFromDirectory = uploadFilesFromDirectory;
const bee_plus_1 = __importDefault(require("./bee-plus"));
const green = '\x1b[32m%s\x1b[0m';
const orange = '\x1b[33m%s\x1b[0m';
/**
 * Buys a postage batch with the specified amount and depth.
 *
 * @param amount - The amount of BZZ tokens to be used for the postage batch.
 * @param depth - The depth of the postage batch.
 * @returns A promise that resolves to a CreatePostageBatchResponse object containing details of the created postage batch.
 */
function buy(amount, depth) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('buy postage batch with', amount, depth);
        const beePlus = bee_plus_1.default.create();
        const result = yield beePlus.createPostageBatch(amount, depth);
        console.log(green, 'Postage batch created:', result);
        return result;
    });
}
/**
 * Feeds a file to a feed with the specified topic.
 *
 * @param file - The path to the file to be fed.
 * @param topic - The topic of the feed.
 * @returns A promise that resolves to the reference of the feed.
 */
function feed(file, topic) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('feed', file, topic);
        const beePlus = bee_plus_1.default.create();
        return beePlus.writeFeed(file, topic);
    });
}
/**
 * Uploads a file to the Bee network.
 *
 * @param file - The path to the file to be uploaded.
 * @returns A promise that resolves to an UploadResultWithCid object containing the CID of the uploaded file.
 */
function uploadFile(file) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('uploading file', file);
        const beePlus = bee_plus_1.default.create();
        const result = yield beePlus.upload(file);
        return result;
    });
}
/**
 * Uploads files from a directory to the Bee network.
 *
 * @param path - The path to the directory containing the files to be uploaded.
 * @returns A promise that resolves to an UploadResultWithCid object containing the CID of the uploaded files.
 */
function uploadFilesFromDirectory(path) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('uploading files from directory', path);
        const beePlus = bee_plus_1.default.create();
        const result = yield beePlus.uploadFilesFromDirectory(beePlus.postageBatchId, path);
        console.log(green, 'Upload files result:', result);
        return result;
    });
}
module.exports = {
    buy,
    feed,
    uploadFile,
    uploadFilesFromDirectory,
    BeePlus: bee_plus_1.default
};
