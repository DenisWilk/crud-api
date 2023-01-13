import { createServer } from "http";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;
const server = createServer((req, res) => {
  console.log("server request");
});

server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
server.on("error", (error) =>
  console.log(" Error! The server is not running!\n", error)
);
