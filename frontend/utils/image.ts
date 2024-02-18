import { ALLOWED_IMAGE_SIZE, ALLOWED_IMAGE_EXTENSIONS } from '~/constants/defaultValues/validation';

export const isImageTooBig = (count: number) => {
	const size = count / (1024 * 1024); // in Mb
	return size > ALLOWED_IMAGE_SIZE;
};

export const isImageFormatAllowed = (fileName: string) => {
	const fileExtension = fileName.slice((Math.max(0, fileName.lastIndexOf('.')) || Infinity) + 1);
	return ALLOWED_IMAGE_EXTENSIONS.includes(fileExtension);
};
