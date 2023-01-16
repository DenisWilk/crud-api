export interface IUser {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
}

export interface IMessages {
  incorrectData: string;
  noId: string;
  requiredData: string;
  unsupportRequest: string;
  noUser: string;
  unsupportPath: string;
  serverError: string;
}
