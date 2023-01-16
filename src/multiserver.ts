import { cpus } from "node:os";
import cluster from "node:cluster";
import { server, port } from "./server";

export function runMultiServer(): void {
  if (cluster.isPrimary) {
    console.log(`Main pid: ${process.pid}`);

    for (let i: number = 0; i < cpus().length; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker): void => {
      console.log(`Worker ${worker.process.pid} is stopped`);
    });
  } else {
    server.listen(port, (): void => {
      console.log(`Worker pid: ${process.pid}`);
    });
  }
}
