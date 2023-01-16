import { IncomingMessage, ServerResponse } from "http";
import { validate } from "uuid";
import { IUser } from "./types";
import { usersDatabase } from "./controller";

export function validateId(response: ServerResponse, id: string): boolean {
  try {
    if (!validate(id)) {
      response.writeHead(400, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ code: 400, message: "" }));
      return false;
    }
    if (!usersDatabase.find((el: IUser): boolean => el.id === id)) {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ code: 404, message: "" }));
      return false;
    }
  } catch {
    response.writeHead(500, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ code: 500, message: "" }));
    return false;
  }
  return true;
}

export function validateBody(response: ServerResponse, body: IUser): boolean {
  const { username, age, hobbies } = body;
  try {
    if (
      typeof username !== "string" ||
      typeof age !== "number" ||
      !Array.isArray(hobbies)
    ) {
      response.writeHead(400, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ code: 400, message: "" }));
      return false;
    }
    if (hobbies.length > 0) {
      if (!hobbies.some((elem) => typeof elem === "string")) {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ code: 400, message: "" }));
        return false;
      }
    }
  } catch {
    response.writeHead(500, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ code: 500, message: "" }));
    return false;
  }
  return true;
}

export function setBody(
  request: IncomingMessage,
  response: ServerResponse
): Promise<IUser> {
  return new Promise((resolve): void => {
    let body: string = "";

    request.on("data", (chunk: Buffer): void => {
      body = body + String(chunk);
    });

    request.on("end", (): void => {
      try {
        resolve(JSON.parse(body));
      } catch {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ code: 400, message: "" }));
      }
    });
  });
}
