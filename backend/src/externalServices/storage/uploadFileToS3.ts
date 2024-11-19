import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { s3Client } from '../../config/storage';
import { vars } from '../../config/vars';

export const uploadFileToS3 = async (path: string, file: PutObjectCommandInput['Body']) => {
	if (!s3Client) return;
	const params: PutObjectCommandInput = {
		Bucket: vars.s3.bucket,
		Key: path,
		Body: file
	};
	const command = new PutObjectCommand(params);
	await s3Client.send(command);
};
