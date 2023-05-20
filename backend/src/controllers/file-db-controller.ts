import fs from "node:fs/promises";

import fsSync from "fs";

import { eventsStateController } from "./events-state-controller";
import { getTimestamp, TIMESTAMP_TYPES } from "../utils/get-timestamp";

export enum TASK_TYPES {
  READ_FILE = "read",
  WRITE_FILE = "write",
  SAVE_BACKUP = "backup",
}

type Task = {
  action: TASK_TYPES;
  time: number;
};

export class FileDbController {
  constructor() {
    if (!fsSync.existsSync("assets/db")) {
      fsSync.mkdirSync("assets/db");
      fsSync.writeFileSync("assets/db/events.json", "[]", {});
    } else if (!fsSync.existsSync("assets/db/events.json")) {
      fsSync.writeFileSync("assets/db/events.json", "[]", {});
    } else {
      this.addTask(TASK_TYPES.READ_FILE);
    }
    this.addTask(
      TASK_TYPES.SAVE_BACKUP,
      Date.now() + getTimestamp({ value: 12, type: TIMESTAMP_TYPES.HOURS })
    );

    setInterval(
      this.checkTasks.bind(this),
      getTimestamp({ value: 1, type: TIMESTAMP_TYPES.SECONDS })
    );
  }

  _tasks: Task[] = [];

  get tasks() {
    return this._tasks;
  }

  set tasks(value) {
    this._tasks = value;
  }

  private addTask(type: TASK_TYPES, delay?: number) {
    this.tasks.push({ action: type, time: delay || 0 });
    this.tasks.sort((a, b) => a.time - b.time);
  }

  getTasks() {
    return this.tasks;
  }

  private checkTasks() {
    const tasks = this.getTasks();

    if (tasks[0].time > Date.now()) return;
    const currentTask = tasks.shift();

    if (!currentTask) return;
    this.runTask(currentTask);
  }

  private async runTask(task: Task) {
    switch (task.action) {
      case TASK_TYPES.READ_FILE:
        await this.loadFromDrive();
        break;

      case TASK_TYPES.WRITE_FILE:
        await this.saveToDrive();
        break;

      case TASK_TYPES.SAVE_BACKUP:
        await this.makeBackup();
        this.addTask(
          TASK_TYPES.SAVE_BACKUP,
          Date.now() + getTimestamp({ value: 12, type: TIMESTAMP_TYPES.HOURS })
        );
        break;

      default:
        break;
    }
  }

  updateDB() {
    this.addTask(TASK_TYPES.WRITE_FILE);
  }

  private async saveToDrive() {
    const events = eventsStateController.getEvents();
    await fs.writeFile("assets/db/events.json", JSON.stringify(events), {
      encoding: "utf-8",
      flag: "w",
    });
  }

  private async makeBackup() {
    const dateString = new Date().toISOString();
    await fs.copyFile(
      "assets/db/events.json",
      `assets/db/backup-${dateString}.json`
    );
  }

  private async loadFromDrive() {
    const json = await fs.readFile("assets/db/events.json", {
      encoding: "utf-8",
    });
    if (json.trim() === "") return;
    const events = JSON.parse(json);
    eventsStateController.events = events;
  }
}

export const fileDBController = new FileDbController();
