import { IncomingMessage, ServerResponse } from "http";
import {
  getUsers,
  getUser,
  addUser,
  updateUser,
  removeUser,
} from "./controller";

export async function router(
  request: IncomingMessage,
  response: ServerResponse
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
            getUser(response, id);
          } else {
            getUsers(response);
          }
          break;

        case "POST":
          if (id) {
            response.writeHead(404, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ code: 404, message: "" }));
          } else {
            addUser(request, response);
          }
          break;

        case "PUT":
          if (id) {
            updateUser(request, response, id);
          } else {
            response.writeHead(404, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ code: 404, message: "" }));
          }
          break;

        case "DELETE":
          if (id) {
            removeUser(response, id);
          } else {
            response.writeHead(404, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ code: 404, message: "" }));
          }
          break;

        default:
          response.writeHead(400, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ code: 400, message: "" }));
      }
    } else {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ code: 404, message: "" }));
    }
  } catch {
    response.writeHead(500, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ code: 500, message: "" }));
  }
}
