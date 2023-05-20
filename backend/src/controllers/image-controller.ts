import fs from "node:fs/promises";

import fsSync from "fs";

import { eventsStateController } from "./events-state-controller";


export type AddImageParams = {
  data: ArrayBuffer,
  filetype: string,
  eventID: string
}
export class FileDbController {
  constructor() {
    if (!fsSync.existsSync("assets/img")) {
      fsSync.mkdirSync("assets/img");
    }
  }

  async saveImg({data, filetype, eventID}: AddImageParams) {
    const realPath = `assets/img/${eventID}.${filetype}`
    const staticPath = `image/${eventID}.${filetype}`
    await fs.writeFile(realPath, Buffer.from(data), {
      flag: "w",
    });
    const event = eventsStateController.getEvent(eventID);
    if(!event) return;
    event.image = staticPath;
    eventsStateController.updateEvent(event);
  }

  async getImg(path: string) {
    return await fs.readFile(path);
  }
}

export const imageController = new FileDbController();
