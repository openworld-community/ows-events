import * as fs from "fs";
import {User} from "./User";

export class Users {
  private users: { [key: number]: User } = {};

  constructor() {
    if (!fs.existsSync("assets")) {
      fs.mkdirSync("assets");
      fs.mkdirSync("assets/db");
      fs.writeFileSync("assets/db/users.json", "{}");
    } else if (!fs.existsSync("assets/db")) {
      fs.mkdirSync("assets/db");
      fs.writeFileSync("assets/db/users.json", "{}");
    } else if (!fs.existsSync("assets/db/users.json")) {
      fs.writeFileSync("assets/db/users.json", "{}");
    }

    this.users = JSON.parse(fs.readFileSync("assets/db/users.json", "utf-8"));
  }

  private writeUsers() {
    fs.writeFileSync("assets/db/users.json", JSON.stringify(this.users));
  }

  addUser(user: User) {
    this.users[user.chatId] = user;
    this.writeUsers();
  }

  markUserAsInactive(chatId: number) {
    this.users[chatId].status = "inactive";

    this.writeUsers();
  }

  getUser(chatId: number) {
    return this.users[chatId];
  }

  getActiveUsers() {
    return Object.values(this.users).filter((user) => user.status === "active");
  }
}