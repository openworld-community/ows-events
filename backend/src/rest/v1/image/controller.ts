import { imageController } from '../../../controllers/image-controller';
import { IAddImageHandlerProps, IDeleteImageHandlerProps } from './types';

export const deleteImage: IDeleteImageHandlerProps = async (request) => {
	const filePath = request.body.path;
	if (!filePath) {
		return {
			type: 'error'
		};
	}

	try {
		await imageController.deleteImg(`.${filePath}`);
		return {
			type: 'success',
			data: undefined
		};
	} catch (e) {
		return {
			type: 'error'
		};
	}
};

export const addImage: IAddImageHandlerProps = async (request) => {
	const data = await request.file();
	if (!data) {
		return {
			type: 'error'
		};
	}

	const buffer = await data.toBuffer();
	if (!buffer) {
		return {
			type: 'error'
		};
	}

	try {
		const path = await imageController.saveImg({
			data: buffer,
			filetype: data.filename.split('.').reverse()[0]
		});
		return {
			type: 'success',

			data: {
				path
			}
		};
	} catch (e) {
		return {
			type: 'error'
		};
	}
};
