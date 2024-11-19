import { Bee, BeeOptions, FeedWriter, PostageBatch, UploadResultWithCid } from "@ethersphere/bee-js";
import config from "./config";
import fs from 'fs';
import path from 'path';
import api from "./api";
import { CreatePostageBatchResponse, KeyData, ManifestReference } from "./types";
import { HDNodeWallet, Wallet } from "ethers";

class BeePlus extends Bee {
    keyData: KeyData = { owner: '', signer: '' };
    postageBatchId: string = '';
    manifestReference: string = '';
    wallet: HDNodeWallet | null = null;

    static create(beeUrl?: string, batchId?: string): BeePlus {
        return new BeePlus(beeUrl || process.env.BEE_URL || '', batchId || process.env.BATCH_ID || '');
    }

    constructor(beeUrl: string, batchId: string) {
        if (!beeUrl || !batchId) {
            throw new Error('Bee URL and batch ID are required');
        }
        const wallet = Wallet.createRandom();

        let options: BeeOptions = {
            signer: wallet.privateKey
        }

        super(beeUrl, options);
        this.wallet = wallet;
        this.postageBatchId = batchId;
    }

    async createPostageBatch(amount?: string, depth?: string): Promise<CreatePostageBatchResponse> {
        const depthNumber = Number(depth);
        if (isNaN(Number(amount)) || isNaN(depthNumber)) {
            throw new Error('Amount and depth must be convert to numbers');
        }
        const response: CreatePostageBatchResponse = await api.createPostageBatch(amount, depthNumber);
        this._writePostageBatchToFile(config.postageBatchPath, response);
        this.refreshPostageBatch();
        console.log('Postage batch created:', response);
        return response;
    }

    async fetchPostageBatch(): Promise<PostageBatch> {
        const response: PostageBatch = await api.fetchPostageBatch(this.postageBatchId);
        return response;
    }

    _writePostageBatchToFile(filePath: string, postageBatch: CreatePostageBatchResponse) {
        fs.writeFileSync(filePath, JSON.stringify(postageBatch, null, 2));
    }

    _getPostageBatchFromFile(filePath: string): CreatePostageBatchResponse {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent);
    }

    refreshPostageBatch() {
        this.postageBatchId = this._getPostageBatchFromFile(config.postageBatchPath).batchID;
    }

    async upload(file: string): Promise<UploadResultWithCid> {
        const fileName = path.basename(file);
        const fileDir = path.dirname(file);
        const filePath = path.join(__dirname, file);
        console.log('filePath:', filePath);
        const data = fs.readFileSync(filePath);
        const result = await this.uploadFile(this.postageBatchId, data, fileName);
        console.log('Upload file result:', result);
        return result;
    }

    // usage: writeFeed('file.txt', '/my-topic')
    async writeFeed(file: string, rawTopic: string): Promise<string> {
        if (!this.wallet) {
            throw new Error('Wallet not found');
        }
        const fileName = path.basename(file);
        console.log('fileName:', fileName)
        const topic = this.makeFeedTopic(rawTopic);
        const result: UploadResultWithCid = await this.upload(file);
        const feedWriter: FeedWriter = this.makeFeedWriter('sequence', topic)
        const response = await feedWriter.upload(this.postageBatchId, result.reference)
        console.log('Feed writer response:', response)
        const manifestReference: ManifestReference = await this.createFeedManifest(this.postageBatchId, 'sequence', topic, this.wallet?.address)
        //const resultUrl = `/bzz/${(await this.createFeedManifest(this.postageBatchId, 'sequence', topic, this.wallet?.address)).reference}${rawTopic}`
        const resultUrl = `/bzz/${manifestReference.reference}${rawTopic}`
        console.log('Feed URL:', resultUrl)
        return resultUrl;
    }
}

export default BeePlus;
