import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client } from '../../config/storage';
import { vars } from '../../config/vars';

export const createPresignedUrlWithClient = async (path: string) => {
	if (!s3Client) return;
	const params: PutObjectCommandInput = {
		Bucket: vars.s3.bucket,
		Key: path
	};
	const command = new PutObjectCommand(params);
	await getSignedUrl(s3Client, command, { expiresIn: 3600 });
};
