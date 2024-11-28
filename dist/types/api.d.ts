import { AxiosInstance } from "axios";
import { CreatePostageBatchResponse } from "./types";
import { PostageBatch } from "@ethersphere/bee-js";
/**
 * Bee API client
 */
declare class Api {
    http: AxiosInstance;
    constructor();
    createPostageBatch(amount?: string, depth?: number): Promise<CreatePostageBatchResponse>;
    fetchPostageBatch(postageBatchId: string): Promise<PostageBatch>;
}
export default Api;
