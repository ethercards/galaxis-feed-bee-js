import { UploadResultWithCid } from "@ethersphere/bee-js";
import BeePlus from "./bee-plus";
import { CreatePostageBatchResponse } from "./types";

const green = '\x1b[32m%s\x1b[0m';
const orange = '\x1b[33m%s\x1b[0m';

export async function buyPotageBatch(amount: string, depth: string): Promise<CreatePostageBatchResponse> {
    console.log('buy postage batch with', amount, depth);
    const beePlus = BeePlus.create();
    const result = await beePlus.createPostageBatch(amount, depth);
    console.log(green, 'Postage batch created:', result);
    return result;
}

export async function feedFile(file: string, topic: string): Promise<string> {
    console.log('feed', file, topic);
    const beePlus = BeePlus.create();
    return beePlus.writeFeed(file, topic);
}

export async function uploadFile(file: string): Promise<UploadResultWithCid> {
    console.log('uploading file', file);
    const beePlus = BeePlus.create();
    const result = await beePlus.upload(file);
    console.log(green, 'Upload file result:', result);
    return result;
}

export async function uploadFilesFromDirectory(path: string): Promise<UploadResultWithCid> {
    console.log('uploading files from directory', path);
    const beePlus = BeePlus.create();
    const result = await beePlus.uploadFilesFromDirectory(beePlus.postageBatchId, path);

    console.log(green, 'Upload files result:', result);
    return result;
}

module.exports = {
    buyPotageBatch,
    feedFile,
    uploadFile,
    uploadFilesFromDirectory,
    BeePlus
}
