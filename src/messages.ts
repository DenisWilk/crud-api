import { IMessages } from "./types";

export const messages: IMessages = {
  incorrectData: "Please check that the JSON-object fields are correct.",
  noId: "User not have uuid.",
  requiredData: "Required field is not filled or the data in it is incorrect.",
  unsupportRequest:
    "Server cannot process the request. Please check if the request is correct.",
  noUser: "User not found.",
  unsupportPath: "No path exists. Please check if the request is correct.",
  serverError: "Server error, please try later.",
};
