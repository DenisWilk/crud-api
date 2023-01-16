import { createServer, Server, IncomingMessage, ServerResponse } from "http";
import dotenv from "dotenv";
import { requestsHandler } from "./requests";

dotenv.config();

const port: string | 4000 = process.env.PORT || 4000;
const server: Server<typeof IncomingMessage, typeof ServerResponse> = createServer(requestsHandler);

function runServer(): void {
  server.listen(port, (): void => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
  server.on("error", (error: Error): void =>
    console.log(" Error! The server is not running!\n", error)
  );
}
runServer();

