import fs from "node:fs/promises";

import fsSync from "fs";

import { v4 as uuid } from "uuid";

export type AddImageParams = {
  data: ArrayBuffer;
  filetype: string;
};
export class FileDbController {
  constructor() {
    if (!fsSync.existsSync("assets/img")) {
      fsSync.mkdirSync("assets/img");
    }
  }

  async saveImg({ data, filetype }: AddImageParams) {
    const imgId = uuid();
    const realPath = `assets/img/${imgId}.${filetype}`;
    const staticPath = `/image/${imgId}.${filetype}`;
    await fs.writeFile(realPath, Buffer.from(data), {
      flag: "w",
    });
    return staticPath;
  }

  async deleteImg(path: string) {
    const realPath = path.replace("image/", "assets/img/");
    return await fs.unlink(realPath);
  }
}

export const imageController = new FileDbController();
