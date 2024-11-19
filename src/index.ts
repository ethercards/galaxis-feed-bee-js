import { UploadResultWithCid } from "@ethersphere/bee-js";
import beePlus from "./bee-plus";
import { CreatePostageBatchResponse } from "./types";

const green = '\x1b[32m%s\x1b[0m';
const orange = '\x1b[33m%s\x1b[0m';

export async function buy(amount: string, depth: string): Promise<CreatePostageBatchResponse> {
    console.log('buy postage batch with', amount, depth);
    const result = await beePlus.createPostageBatch(amount, depth);
    console.log(green, 'Postage batch created:', result);
    return result;
}

export async function feed(file: string, topic: string): Promise<string> {
    console.log('feed', file, topic);
    return beePlus.writeFeed(file, topic);
}

export async function upload(file: string): Promise<UploadResultWithCid> {
    console.log('uploading file', file);
    const result = await beePlus.upload(file);
    console.log(green, 'Upload file result:', result);
    return result;
}

// export const main = async () => {

//     const args = process.argv.slice(3); // Get command-line arguments
//     console.log('Arguments:', args);

//     if (args.length > 0) {
//         switch (args[0]) {
//             case 'help':
//             case '?':
//                 console.log('Usage:');
//                 console.log('  help or ?: Display this help message');
//                 console.log('  buy <amount> <depth>: Buy a new postage batch');
//                 console.log('  upload <file-path>: Upload a file');
//                 console.log('  feed <file-path> <topic>: Write to a feed');
//                 break;
//             case 'buy':
//                 if (args.length > 2) {
//                     return await beePlus.createPostageBatch(args[1], args[2]);
//                 } else {
//                     console.log('usage: buy <amount> <depth>');
//                 }

//             case 'upload':
//                 if (args.length > 1) {
//                     return await beePlus.upload(args[1]);
//                 }
//                 else {
//                     console.log("usage: upload <file-path>");
//                 }
//                 break;
//             case 'feed':
//                 if (args.length > 2) {
//                     try {
//                         await beePlus.writeFeed(args[1], args[2]);
//                     } catch (error) {
//                         console.error('Error:', error);
//                         throw error;
//                     }
//                 }
//                 else {
//                     console.log("usage: feed <file-path> <topic>");
//                 }
//                 break;
//             default:
//                 console.log('Invalid command:', args[0]);
//         }
//     }
// }

//main();

module.exports = {
    buy,
    feed,
    upload
}
