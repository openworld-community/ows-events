import { CommonErrorsEnum } from '../../../../../common/const';
import { imageController } from '../../../controllers/image-controller';
import { IAddImageHandlerProps, IDeleteImageHandlerProps } from './types';

export const deleteImage: IDeleteImageHandlerProps = async (request) => {
	const filePath = request.body.path;
	if (!filePath) throw new Error(CommonErrorsEnum.NO_IMAGE_TO_DELETE);

	try {
		await imageController.deleteImg(`.${filePath}`);
		return undefined;
	} catch (e) {
		throw new Error(CommonErrorsEnum.IMAGE_DELETION_ERROR);
	}
};

export const addImage: IAddImageHandlerProps = async (request) => {
	const { image } = request.body;
	if (!image) throw new Error(CommonErrorsEnum.NO_IMAGE_TO_ADD);

	const [filename, data] = image.split('--');
	if (!data) throw new Error(CommonErrorsEnum.IMAGE_ENCODING_ERROR);

	try {
		const path = await imageController.saveImg({
			data: Buffer.from(data, 'base64'),
			filetype: filename.split('.').reverse()[0]
		});
		return { path };
	} catch (e) {
		throw new Error(CommonErrorsEnum.IMAGE_ADDITION_ERROR);
	}
};
