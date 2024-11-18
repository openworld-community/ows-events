import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { s3Client } from '../../config/storage';
import { vars } from '../../config/vars';

export const uploadFileToS3 = async (path: string, file: PutObjectCommandInput['Body']) => {
	const params: PutObjectCommandInput = {
		Bucket: vars.s3.bucket,
		Key: path,
		Body: file
	};
	const command = new PutObjectCommand(params);
	const res = await s3Client.send(command);
	return res;
};
