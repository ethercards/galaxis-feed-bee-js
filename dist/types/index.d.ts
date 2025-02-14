import { AnyJson, FeedManifestResult, UploadResultWithCid } from "@ethersphere/bee-js";
import { CreatePostageBatchResponse } from "./types";
import { FetchFeedUpdateResponse } from "@ethersphere/bee-js/dist/types/modules/feed";
export { UploadResultWithCid } from '@ethersphere/bee-js';
/**
 * Buys a postage batch with the specified amount and depth.
 *
 * @param amount - The amount of BZZ tokens to be used for the postage batch.
 * @param depth - The depth of the postage batch.
 * @returns A promise that resolves to a CreatePostageBatchResponse object containing details of the created postage batch.
 */
export declare function buy(amount: string, depth: string): Promise<CreatePostageBatchResponse>;
/**
 * Feeds a file to a feed with the specified topic.
 *
 * @param file - The path to the file to be fed.
 * @param topic - The topic of the feed.
 * @returns A promise that resolves to the reference of the feed.
 */
export declare function feed(file: string, topic: string): Promise<string>;
/**
 * Feeds an file to a feed with the specified topic, using the specified headers.
 *
 * @param file - The path to the file to be fed.
 * @param topic - The topic of the feed.
 * @returns A promise that resolves to the reference of the feed.
 */
export declare function feedFile(file: string, topic: string, headers: Record<string, string>): Promise<string>;
/**
 * Reads a feed with the specified topic.
 *
 * @param rawTopic - The topic of the feed.
 * @returns A promise that resolves to a FetchFeedUpdateResponse object containing details of the feed.
 */
export declare function readFeed(rawTopic: string): Promise<FetchFeedUpdateResponse>;
/**
 * Gets the manifest reference of a feed with the specified topic.
 *
 * @param rawTopic - The topic of the feed.
 * @returns A promise that resolves to a ManifestReference object containing the reference of the feed.
 */
export declare function getManifestReference(rawTopic: string): Promise<FeedManifestResult>;
/**
 * Uploads a file to the Bee network.
 *
 * @param file - The path to the file to be uploaded.
 * @returns A promise that resolves to an UploadResultWithCid object containing the CID of the uploaded file.
 */
export declare function uploadFile(file: string): Promise<UploadResultWithCid>;
/**
 * Uploads a single file to the Bee network.
 *
 * @param file - The file to be uploaded
 * @returns A promise that resolves to an UploadResultWithCid object containing the CID of the uploaded file.
 */
export declare function uploadSingleFile(file: File): Promise<UploadResultWithCid>;
/**
 * Upload collection of files to a Bee node
 *
 * @param files - list of files to be uploaded
 * @returns A promise that resolves to an UploadResultWithCid object containing the CID of the uploaded file.
 */
export declare function uploadFiles(files: File[] | FileList): Promise<UploadResultWithCid>;
/**
 * Uploads files from a directory to the Bee network.
 *
 * @param path - The path to the directory containing the files to be uploaded.
 * @returns A promise that resolves to an UploadResultWithCid object containing the CID of the uploaded files.
 */
export declare function uploadFilesFromDirectory(path: string): Promise<UploadResultWithCid>;
export declare function readJsonFeed(rawTopic: string): Promise<AnyJson>;
export declare function setJsonFeed(rawTopic: string, data: AnyJson): Promise<AnyJson>;
