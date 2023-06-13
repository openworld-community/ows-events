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
	const { image } = request.body;
	if (!image) {
		return {
			type: 'error'
		};
	}

	const [filename, data] = image.split('--');
	if (!data) {
		return {
			type: 'error'
		};
	}

	try {
		const path = await imageController.saveImg({
			data: Buffer.from(data, 'base64'),
			filetype: filename.split('.').reverse()[0]
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
