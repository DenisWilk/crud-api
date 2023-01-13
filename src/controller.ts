import { IncomingMessage, ServerResponse } from "http";

export function getUsers(responce: ServerResponse): void {}

export function getUser(responce: ServerResponse, id: string): void {}

export function addUser(request: IncomingMessage, responce: ServerResponse): void {}

export function updateUser(
  request: IncomingMessage,
  responce: ServerResponse,
  id: string
): void {}

export function deleteUser(responce: ServerResponse, id: string): void {}
