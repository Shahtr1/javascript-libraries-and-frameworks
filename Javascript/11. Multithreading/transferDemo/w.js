const { workerData, parentPort } = require("worker_threads");

// Access the shared buffer
const buffer = new Uint8Array(workerData.sharedBuffer);

for (let i = 0; i < buffer.length; i++) {
  buffer[i] = 7;
}

parentPort.postMessage("done");
