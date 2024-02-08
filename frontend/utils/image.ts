const ALLOWED_IMAGE_SIZE = 2; //Mb

export const isImageTooBig = (count: number) => {
	const size = count / (1024 * 1024); // in Mb
	return size > ALLOWED_IMAGE_SIZE;
};
