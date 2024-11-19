export interface CreatePostageBatchResponse {
    batchID: string;
    txHash: string;
}

export interface KeyData {
    owner: string;
    signer: string;
}

export interface ManifestReference {
    reference: string;
}