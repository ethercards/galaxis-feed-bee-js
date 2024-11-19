import axios from "axios";
import config from "./config";
import { CreatePostageBatchResponse } from "./types";
import { PostageBatch, PostageBatchBuckets } from "@ethersphere/bee-js";

const http = axios.create({
    baseURL: config.beeUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

class Api {
    async createPostageBatch(amount?: string, depth?: number): Promise<CreatePostageBatchResponse> {
        amount = amount || config.postageStamps.amount.toString();
        depth = depth || config.postageStamps.depth;

        try {
            const response = await http.post(`/stamps/${amount}/${depth}`);
            return response.data;
        } catch (error) {
            console.error('Failed to create postage batch:', error);
            throw error;
        }
    }

    async fetchPostageBatch(postageBatchId: string): Promise<PostageBatch> {
        try {
            const response = await http.get(`/stamps/${postageBatchId}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch postage batch:', error);
            throw error;
        }
    }
}

export default new Api();
