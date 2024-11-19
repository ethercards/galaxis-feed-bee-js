"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletPath = exports.postageBatchPath = exports.POSTAGE_STAMPS_DEPTH = exports.POSTAGE_STAMPS_AMOUNT = exports.BEE_URL = void 0;
exports.BEE_URL = process.env.BEE_URL || 'http://localhost:1633/1';
exports.POSTAGE_STAMPS_AMOUNT = 481559040;
exports.POSTAGE_STAMPS_DEPTH = 20;
exports.postageBatchPath = './postage-batch.json';
exports.walletPath = './wallet.json';
const config = {
    beeUrl: exports.BEE_URL,
    postageStamps: {
        amount: exports.POSTAGE_STAMPS_AMOUNT,
        depth: exports.POSTAGE_STAMPS_DEPTH,
    },
    postageBatchPath: exports.postageBatchPath,
    walletPath: exports.walletPath
};
exports.default = config;
