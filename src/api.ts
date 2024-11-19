import axios, { AxiosInstance } from "axios";
import { CreatePostageBatchResponse } from "./types";
import { PostageBatch } from "@ethersphere/bee-js";


class Api {
    http: AxiosInstance;

    constructor() {
        const http = axios.create({
            baseURL: process.env.BEE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.http = http;
    }
    async createPostageBatch(amount?: string, depth?: number): Promise<CreatePostageBatchResponse> {
        if (!amount || !depth || isNaN(Number(amount)) || isNaN(Number(depth))) {
            throw new Error('Amount and depth are required and must be numbers');
        }

        try {
            const response = await this.http.post(`/stamps/${amount}/${depth}`);
            return response.data;
        } catch (error) {
            console.error('Failed to create postage batch:', error);
            throw error;
        }
    }

    async fetchPostageBatch(postageBatchId: string): Promise<PostageBatch> {
        try {
            const response = await this.http.get(`/stamps/${postageBatchId}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch postage batch:', error);
            throw error;
        }
    }
}

export default Api;
