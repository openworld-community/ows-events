export const ajvFilePlugin = (ajv: any) =>
	ajv.addKeyword({
		keyword: 'isFile',
		compile: (_schema: any, parent: any) => {
			// eslint-disable-next-line no-param-reassign
			parent.type = 'file';
			// eslint-disable-next-line no-param-reassign
			delete parent.isFile;
			return () => true;
		}
	});
