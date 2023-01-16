import { IncomingMessage, ServerResponse } from "http";
import { v4 as uuid } from "uuid";
import { IUser } from "./types";
import { validateId, validateBody, setBody } from "./utils";

export const usersDatabase: IUser[] = [];

export function getUsers(response: ServerResponse): void {
  try {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(usersDatabase));
  } catch {
    response.writeHead(500, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ code: 500, message: "" }));
  }
}

export function getUser(response: ServerResponse, id: string): void {
  const isId = validateId(response, id);

  if (isId) {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(usersDatabase.find((el) => el.id === id)));
  }
}

export async function addUser(
  request: IncomingMessage,
  response: ServerResponse
): Promise<void> {
  try {
    const body: IUser = await setBody(request, response);
    const validBody: boolean = validateBody(response, body);

    if (validBody) {
      const id: string = uuid();
      const user = { id: id, ...body };
      usersDatabase.push(user);

      response.writeHead(201, { "Content-Type": "application/json" });
      response.end(JSON.stringify(user));
    }
  } catch {
    response.writeHead(500, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ code: 500, message: "" }));
  }
}

export async function updateUser(
  request: IncomingMessage,
  response: ServerResponse,
  id: string
): Promise<void> {
  try {
    const isId: boolean = validateId(response, id);

    if (isId) {
      const body: IUser = await setBody(request, response);
      const validBody: boolean = validateBody(response, body);

      if (validBody) {
        const userId = usersDatabase.findIndex((el: IUser): boolean => el.id === id);
        usersDatabase[userId] = { id, ...body };

        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(userId));
      }
    }
  } catch {
    response.writeHead(500, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ code: 500, message: "" }));
  }
}

export function removeUser(response: ServerResponse, id: string): void {
  try {
    const isId: boolean = validateId(response, id);

    if (isId) {
      const databaseIndex: number = usersDatabase.findIndex(
        (el: IUser): boolean => el.id === id
      );

      response.writeHead(204, { "Content-Type": "application/json" });
      response.end(JSON.stringify(usersDatabase.splice(databaseIndex, 1)));
    }
  } catch {
    response.writeHead(500, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ code: 500, message: "" }));
  }
}
