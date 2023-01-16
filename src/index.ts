import { runServer } from "./server";
import { runMultiServer } from "./multiserver";

const mode: string = process.env.MODE || "single";

mode === "single" ? runServer() : runMultiServer();
