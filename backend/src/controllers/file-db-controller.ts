import {EventOnPoster} from "@common/types/event";
import fs from "node:fs/promises";
import {EventsStateController} from "./events-state-controller";

type Task = {
  data: any,
  action: string,
  time: number,
}

export class FileDbController {
  _tasks: Task[] = [];

  get tasks() {
    return this._tasks;
  }

  set tasks(value) {
    this._tasks = value;
  }

  addTask(task: Task) {
    this.tasks.push(task)
  }

  getTasks() {
    return this.tasks;
  }

  async saveToDrive() {
    const events = eventsStateController.getEvents();
    await fs.writeFile('assets/db/events.json', JSON.stringify(events), {encoding: 'utf-8',flag:'w'});
  }

  async loadFromDrive() {
    const json = await fs.readFile('assets/db/events.json', {encoding: 'utf-8'});
    const events = JSON.parse(json);
    this.events = events;
  }
}
