import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../../config/storage';
import { vars } from '../../config/vars';

export const deleteFileOnS3 = async (path: string) => {
	if (!s3Client) return;
	const params = {
		Bucket: vars.s3.bucket,
		Key: path
	};
	const command = new DeleteObjectCommand(params);
	await s3Client.send(command);
};
