import { IncomingMessage, ServerResponse } from "http";
import {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} from "./controller";

export async function router(
  request: IncomingMessage,
  responce: ServerResponse
): Promise<void> {
  try {
    const { url, method } = request;
    const [api, users, id, ...rest] = (url as string)
      .split("/")
      .filter(Boolean);

    if (api === "api" && users === "users" && rest.length === 0) {
      switch (method) {
        case "GET":
          if (id) {
            getUser(responce, id);
          } else {
            getUsers(responce);
          }
          break;

        case "POST":
          if (id) {
            responce.writeHead(404, { "Content-Type": "application/json" });
            responce.end(JSON.stringify({ code: 404, message: "" }));
          } else {
            addUser(request, responce);
          }
          break;

        case "PUT":
          if (id) {
            updateUser(request, responce, id);
          } else {
            responce.writeHead(404, { "Content-Type": "application/json" });
            responce.end(JSON.stringify({ code: 404, message: "" }));
          }
          break;

        case "DELETE":
          if (id) {
            deleteUser(responce, id);
          } else {
            responce.writeHead(404, { "Content-Type": "application/json" });
            responce.end(JSON.stringify({ code: 404, message: "" }));
          }
          break;

        default:
          responce.writeHead(400, { "Content-Type": "application/json" });
          responce.end(JSON.stringify({ code: 400, message: "" }));
      }
    } else {
      responce.writeHead(404, { "Content-Type": "application/json" });
      responce.end(JSON.stringify({ code: 404, message: "" }));
    }
  } catch {
    responce.writeHead(500, { "Content-Type": "application/json" });
    responce.end(JSON.stringify({ code: 500, message: "" }));
  }
}
