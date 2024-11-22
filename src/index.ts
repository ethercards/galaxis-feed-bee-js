import { AnyJson, UploadResultWithCid } from "@ethersphere/bee-js";
import BeePlus from "./bee-plus";
import { CreatePostageBatchResponse } from "./types";
import { Utils } from "@ethersphere/bee-js";

const green = '\x1b[32m%s\x1b[0m';
const orange = '\x1b[33m%s\x1b[0m';

/**
 * Buys a postage batch with the specified amount and depth.
 *
 * @param amount - The amount of BZZ tokens to be used for the postage batch.
 * @param depth - The depth of the postage batch.
 * @returns A promise that resolves to a CreatePostageBatchResponse object containing details of the created postage batch.
 */
export async function buy(amount: string, depth: string): Promise<CreatePostageBatchResponse> {
    console.log('buy postage batch with', amount, depth);
    const beePlus = BeePlus.create();
    const result = await beePlus.createPostageBatch(amount, depth);
    console.log(green, 'Postage batch created:', result);
    return result;
}

/**
 * Feeds a file to a feed with the specified topic.
 *
 * @param file - The path to the file to be fed.
 * @param topic - The topic of the feed.
 * @returns A promise that resolves to the reference of the feed.
 */
export async function feed(file: string, topic: string): Promise<string> {
    console.log('feed', file, topic);
    const beePlus = BeePlus.create();
    return beePlus.writeFeed(file, topic);
}

/**
 * Feeds an image to a feed with the specified topic.
 *
 * @param file - The path to the file to be fed.
 * @param topic - The topic of the feed.
 * @returns A promise that resolves to the reference of the feed.
 */
export async function feedImage(file: string, topic: string, headers: Record<string, string>): Promise<string> {
    console.log('feed image', file, topic);
    const beePlus = BeePlus.create(undefined, undefined, headers);
    return beePlus.writeFeed(file, topic);
}

/**
 * Uploads a file to the Bee network.
 *
 * @param file - The path to the file to be uploaded.
 * @returns A promise that resolves to an UploadResultWithCid object containing the CID of the uploaded file.
 */
export async function uploadFile(file: string): Promise<UploadResultWithCid> {
    console.log('uploading file', file);
    const beePlus = BeePlus.create();
    const result = await beePlus.upload(file);
    return result;
}

/**
 * Uploads files from a directory to the Bee network.
 *
 * @param path - The path to the directory containing the files to be uploaded.
 * @returns A promise that resolves to an UploadResultWithCid object containing the CID of the uploaded files.
 */
export async function uploadFilesFromDirectory(path: string): Promise<UploadResultWithCid> {
    console.log('uploading files from directory', path);
    const beePlus = BeePlus.create();
    const result = await beePlus.uploadFilesFromDirectory(beePlus.postageBatchId, path);

    console.log(green, 'Upload files result:', result);
    return result;
}

export async function readJsonFeed(rawTopic: string): Promise<AnyJson> {
    console.log('reading json feed', rawTopic);
    const beePlus = BeePlus.create();
    const result = await beePlus.getJsonFeed(rawTopic);

    return result;
}

export async function setJsonFeed(rawTopic: string, data: AnyJson): Promise<string> {
    console.log('setting json feed', rawTopic);
    const beePlus = BeePlus.create();
    const result = await beePlus.setJsonFeed(beePlus.postageBatchId, rawTopic, data);

    return result;
}

module.exports = {
    buy,
    feed,
    feedImage,
    uploadFile,
    uploadFilesFromDirectory,
    BeePlus,
    Utils
}
