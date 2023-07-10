export const trimString = (str: string, w: number): string => {
	return str.length > w ? `${str.slice(0, w)}…` : str
}
