export const BEE_URL = process.env.BEE_URL || 'http://localhost:1633/1';
export const POSTAGE_STAMPS_AMOUNT = 481559040;
export const POSTAGE_STAMPS_DEPTH = 20;
export const postageBatchPath = './postage-batch.json';
export const walletPath = './wallet.json';

const config = {
    beeUrl: BEE_URL,
    postageStamps: {
        amount: POSTAGE_STAMPS_AMOUNT,
        depth: POSTAGE_STAMPS_DEPTH,
    },
    postageBatchPath,
    walletPath
};

export default config;
