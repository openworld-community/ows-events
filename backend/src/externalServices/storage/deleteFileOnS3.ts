import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../../config/storage';
import { vars } from '../../config/vars';

export const deleteFileOnS3 = async (path: string) => {
	const params = {
		Bucket: vars.s3.bucket,
		Key: path
	};
	const command = new DeleteObjectCommand(params);
	const res = await s3Client.send(command);
	return res;
};
