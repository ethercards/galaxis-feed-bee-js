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
exports.main = void 0;
exports.buy = buy;
exports.feed = feed;
exports.upload = upload;
const bee_plus_1 = __importDefault(require("./bee-plus"));
const green = '\x1b[32m%s\x1b[0m';
const orange = '\x1b[33m%s\x1b[0m';
function buy(amount, depth) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('buy postage batch with', amount, depth);
        const result = yield bee_plus_1.default.createPostageBatch(amount, depth);
        console.log(green, 'Postage batch created:', result);
        return result;
    });
}
function feed(file, topic) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('feed', file, topic);
        return bee_plus_1.default.writeFeed(file, topic);
    });
}
function upload(file) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('uploading file', file);
        const result = yield bee_plus_1.default.upload(file);
        console.log(green, 'Upload file result:', result);
        return result;
    });
}
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const args = process.argv.slice(3); // Get command-line arguments
    console.log('Arguments:', args);
    if (args.length > 0) {
        switch (args[0]) {
            case 'help':
            case '?':
                console.log('Usage:');
                console.log('  help or ?: Display this help message');
                console.log('  buy <amount> <depth>: Buy a new postage batch');
                console.log('  upload <file-path>: Upload a file');
                console.log('  feed <file-path> <topic>: Write to a feed');
                break;
            case 'buy':
                if (args.length > 2) {
                    return yield bee_plus_1.default.createPostageBatch(args[1], args[2]);
                }
                else {
                    console.log('usage: buy <amount> <depth>');
                }
            case 'upload':
                if (args.length > 1) {
                    return yield bee_plus_1.default.upload(args[1]);
                }
                else {
                    console.log("usage: upload <file-path>");
                }
                break;
            case 'feed':
                if (args.length > 2) {
                    try {
                        yield bee_plus_1.default.writeFeed(args[1], args[2]);
                    }
                    catch (error) {
                        console.error('Error:', error);
                        throw error;
                    }
                }
                else {
                    console.log("usage: feed <file-path> <topic>");
                }
                break;
            default:
                console.log('Invalid command:', args[0]);
        }
    }
});
exports.main = main;
//main();
