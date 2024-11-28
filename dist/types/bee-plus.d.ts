import { Bee, PostageBatch, UploadResultWithCid } from "@ethersphere/bee-js";
import { CreatePostageBatchResponse, KeyData } from "./types";
import { HDNodeWallet } from "ethers";
declare class BeePlus extends Bee {
    keyData: KeyData;
    postageBatchId: string;
    manifestReference: string;
    wallet: HDNodeWallet | null;
    static create(beeUrl?: string, batchId?: string, headers?: Record<string, string>): BeePlus;
    static initWallet(): HDNodeWallet;
    constructor(beeUrl: string, batchId: string, headers?: Record<string, string>);
    createPostageBatch(amount?: string, depth?: string): Promise<CreatePostageBatchResponse>;
    fetchPostageBatch(): Promise<PostageBatch>;
    upload(file: string): Promise<UploadResultWithCid>;
    writeFeed(file: string, rawTopic: string): Promise<string>;
}
export default BeePlus;
