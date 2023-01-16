import { IncomingMessage, ServerResponse } from "http";
import { messages } from "./messages";
import {
  getUsers,
  getUser,
  addUser,
  updateUser,
  removeUser,
} from "./controller";

export async function requestsHandler(
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
            response.end(JSON.stringify({ code: 404, message: messages.unsupportPath }));
          } else {
            addUser(request, response);
          }
          break;

        case "PUT":
          if (id) {
            updateUser(request, response, id);
          } else {
            response.writeHead(404, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ code: 404, message: messages.unsupportPath }));
          }
          break;

        case "DELETE":
          if (id) {
            removeUser(response, id);
          } else {
            response.writeHead(404, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ code: 404, message: messages.unsupportPath }));
          }
          break;

        default:
          response.writeHead(400, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ code: 400, message: messages.unsupportRequest }));
      }
    } else {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ code: 404, message: messages.unsupportPath }));
    }
  } catch {
    response.writeHead(500, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ code: 500, message: messages.serverError }));
  }
}
