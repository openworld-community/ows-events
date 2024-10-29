import { S3Client } from '@aws-sdk/client-s3';
import { vars } from './vars';

export const isStorageSetupFull =
	vars.s3.region !== '' &&
	vars.s3.endpoint !== '' &&
	vars.s3.bucket !== '' &&
	vars.s3.secrets.secretAccessKey !== '' &&
	vars.s3.secrets.accessKeyId !== '';

export const s3Client = new S3Client({
	region: vars.s3.region,
	endpoint: vars.s3.endpoint,
	credentials: {
		accessKeyId: vars.s3.secrets.accessKeyId,
		secretAccessKey: vars.s3.secrets.secretAccessKey
	}
});
