"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class Api {
    constructor() {
        const http = axios_1.default.create({
            baseURL: process.env.BEE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.http = http;
    }
    createPostageBatch(amount, depth) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!amount || !depth || isNaN(Number(amount)) || isNaN(Number(depth))) {
                throw new Error('Amount and depth are required and must be numbers');
            }
            try {
                const response = yield this.http.post(`/stamps/${amount}/${depth}`);
                return response.data;
            }
            catch (error) {
                console.error('Failed to create postage batch:', error);
                throw error;
            }
        });
    }
    fetchPostageBatch(postageBatchId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.http.get(`/stamps/${postageBatchId}`);
                return response.data;
            }
            catch (error) {
                console.error('Failed to fetch postage batch:', error);
                throw error;
            }
        });
    }
}
exports.default = Api;
