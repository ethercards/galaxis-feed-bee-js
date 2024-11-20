# Galaxis Feed Bee JS

This document provides an overview of the Galaxis Feed Bee JS application.

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API](#api)

## Introduction

Galaxis Feed Bee JS is a JavaScript library designed to interact with the Galaxis Feed Bee API. It provides a simple and efficient way to manage and retrieve feed data.

## Installation

To install the library, use npm or yarn:

```bash
npm install git+https://github.com/ethercards/galaxis-feed-be-js.git
```

or

```bash
yarn add git+https://github.com/ethercards/galaxis-feed-be-js.git
```

## Usage

Here is an example of how to use the library in your project. The main entry point is `index.ts`.

```typescript
import { feed, buy } from "galaxis-feed-be-js";

async function execBuy() {
  process.env.BEE_URL = "http://localhost:1633/1/"; // Set your bee node URL
  // Calling buy, the process.env.BATCH_ID can be any string
  process.env.BATCH_ID = "no-id"; // For feed, upload, uploadFilesFromDirectory
  const response = await buy(file, "/all.json");
}

async function execFeed() {
  process.env.BEE_URL = "http://localhost:1633/1/"; // Set your bee node URL
  // Calling buy, the process.env.BATCH_ID can be any string
  process.env.BATCH_ID =
    "a0ba418731296d4ca653452f11cb45653764b8d9d18ca32bd4e2fd932c70c53d"; // For feed, upload, uploadFilesFromDirectory
  const response = await feed(file, "/all.json");
}
```

## API

### `buy(amount: string, depth: string): Promise<CreatePostageBatchResponse>`

Buy batchId

- **Parameters:**

  - `amount` (string): Describe batch TTL.
  - `depth` (string): Describe storage space.

- **Returns:**
  - `Promise<CreatePostageBatchResponse>`: [Returns the given batchId.](https://docs.ethswarm.org/docs/develop/access-the-swarm/buy-a-stamp-batch/)

### `feed(file: string, topic: string): Promise<string>`

Purchases the specified item in the given quantity.

- **Parameters:**

  - `file` (string): File to upload.
  - `topic` (string): The path on Swarm.

- **Returns:**
  - `Promise<string>`: Reference URL for the uploaded file.

### `uploadFile(file: string): Promise<UploadResultWithCid>`

Upload a given file to Swarm

- **Parameters:**

  - `file` (string): File to upload.

- **Returns:**
  - `Promise<UploadResultWithCid>`: [Reference URL for the uploaded file.](https://bee-js.ethswarm.org/docs/api/interfaces/UploadResultWithCid/)

### `uploadFilesFromDirectory(path: string): Promise<UploadResultWithCid>`

Upload a given file to Swarm

- **Parameters:**

  - `path` (string): The path of the directory.

- **Returns:**
  - `Promise<UploadResultWithCid>`: [Reference URL for the uploaded file.](https://bee-js.ethswarm.org/docs/api/interfaces/UploadResultWithCid/)
