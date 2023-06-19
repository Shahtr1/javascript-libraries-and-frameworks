const { Worker } = require("worker_threads");

const sharedBuffer = new SharedArrayBuffer(4);
const buffer = new Uint8Array(sharedBuffer);
buffer.fill(5); // [5, 5, 5, 5]

console.log("buffer before modify: ", buffer);

// Create a worker and pass the shared buffer to it
const worker = new Worker("./w.js", {
  workerData: { sharedBuffer },
});

worker.once("message", () => {
  console.log("buffer after modify: ", buffer);
});
