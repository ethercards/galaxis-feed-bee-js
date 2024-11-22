import { AnyJson, Bee, BeeOptions, FeedWriter, PostageBatch, UploadResultWithCid } from "@ethersphere/bee-js";
import fs from 'fs';
import path from 'path';
import Api from "./api";
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

    static initWallet(): HDNodeWallet {
        const packageName = 'galaxis-feed-be-js';
        const configDir = path.resolve(process.cwd(), '.config', packageName);
        const walletFilePath = path.join(configDir, 'wallet.json');

        if (!fs.existsSync(configDir)) {
            fs.mkdirSync(configDir, { recursive: true });
            console.log(`Created directory: ${configDir}`);
        }

        let wallet: HDNodeWallet;

        if (fs.existsSync(walletFilePath)) {
            const walletData = fs.readFileSync(walletFilePath, 'utf-8');
            wallet = JSON.parse(walletData);
        } else {
            wallet = Wallet.createRandom();
            const walletData = JSON.stringify({ address: wallet.address, privateKey: wallet.privateKey });
            fs.writeFileSync(walletFilePath, walletData, 'utf-8');
        }

        console.log('Wallet:', wallet);

        return wallet;
    }

    constructor(beeUrl: string, batchId: string) {
        if (!beeUrl || !batchId) {
            throw new Error('Bee URL and batch ID are required');
        }
        const wallet = BeePlus.initWallet();

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
        const api = new Api();
        const response: CreatePostageBatchResponse = await api.createPostageBatch(amount, depthNumber);
        console.log('Postage batch created:', response);
        return response;
    }

    async fetchPostageBatch(): Promise<PostageBatch> {
        const api = new Api();
        const response: PostageBatch = await api.fetchPostageBatch(this.postageBatchId);
        return response;
    }

    async upload(file: string): Promise<UploadResultWithCid> {
        const fileName = path.basename(file);
        const data = fs.readFileSync(file);
        const result = await this.uploadFile(this.postageBatchId, data, fileName);
        console.log('Upload file result:', result);
        return result;
    }

    // usage: writeFeed('file.txt', '/my-topic')
    async writeFeed(file: string, rawTopic: string): Promise<string> {
        if (!this.wallet) {
            throw new Error('Wallet not found');
        }
        const topic = this.makeFeedTopic(rawTopic);
        console.log('Feed topic:', topic);
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

    async readJsonFeed(rawTopic: string): Promise<AnyJson> {
        const response = await super.getJsonFeed(rawTopic);
        console.log('Feed response:', response);

        return response;
    }
    
}

export default BeePlus;
