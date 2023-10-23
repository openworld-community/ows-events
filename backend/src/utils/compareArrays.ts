export const compareArrays: ICompareArrays = (a, b) =>
	a.length === b.length && a.every((element, index) => element === b[index]);

type ICompareArrays = {
	(a: any[], b: any[]): boolean;
};
