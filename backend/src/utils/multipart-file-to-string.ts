// Multipart magic for swagger.
export const onFile = async (part: any) => {
	const buff = await part.toBuffer();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const decoded = buff.toString('base64');
	// eslint-disable-next-line no-param-reassign
	part.value = `${part.filename}--${decoded}`; // set `part.value` to specify the request body value
};
