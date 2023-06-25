export enum SizeTypesEnum {
	BYTES = 'b',
	KILOBYTES = 'kb',
	MEGABYTES = 'mb',
	GIGABYTES = 'gb'
}

const ONE_BYTE = 1;
const ONE_KILOBYTE = ONE_BYTE * 1024;
const ONE_MEGABYTE = ONE_KILOBYTE * 1024;
const ONE_GIGABYTE = ONE_MEGABYTE * 1024;

const SizeTypeValues = {
	[SizeTypesEnum.BYTES]: ONE_BYTE,
	[SizeTypesEnum.KILOBYTES]: ONE_KILOBYTE,
	[SizeTypesEnum.MEGABYTES]: ONE_MEGABYTE,
	[SizeTypesEnum.GIGABYTES]: ONE_GIGABYTE
};

export type GetSizeParams = {
	value: number;
	type: SizeTypesEnum;
};

export const getSize = ({ value, type }: GetSizeParams) => SizeTypeValues[type] * value;
