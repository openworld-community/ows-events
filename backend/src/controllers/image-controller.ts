import fs from 'node:fs/promises';

import fsSync from 'fs';

import { v4 as uuid } from 'uuid';
import { resolve } from 'path';
import { isStorageSetupFull } from '../config/storage';
import { uploadFileToS3 } from '../externalServices/storage/uploadFileToS3';
import { vars } from '../config/vars';
import { deleteFileOnS3 } from '../externalServices/storage/deleteFileOnS3';

export type AddImageParams = {
	data: ArrayBuffer;
	filetype: string;
};

export class FileDbController {
	constructor() {
		if (!fsSync.existsSync('assets/img')) {
			fsSync.mkdirSync('assets/img');
		}
	}

	async saveImg({ data, filetype }: AddImageParams) {
		const imgId = uuid();
		const realPath = `assets/img/${imgId}.${filetype}`;
		const staticPath = `/image/${imgId}.${filetype}`;
		const s3Path = `image/${imgId}.${filetype}`;
		if (isStorageSetupFull) {
			try {
				await uploadFileToS3(s3Path, Buffer.from(data));
				return `https://${vars.s3.bucket}.fsn1.your-objectstorage.com/${s3Path}`;
			} catch (e) {
				// eslint-disable-next-line no-console
				console.error(e);
			}
		}

		await fs.writeFile(resolve(realPath), Buffer.from(data), {
			flag: 'w'
		});
		return staticPath;
	}

	async deleteImg(path: string) {
		if (isStorageSetupFull) {
			await deleteFileOnS3(
				path.replace(`https://${vars.s3.bucket}.fsn1.your-objectstorage.com/`, '')
			);
			return undefined;
		}
		const realPath = path.replace('image/', 'assets/img/');
		return fs.unlink(resolve(realPath));
	}
}

export const imageController = new FileDbController();
