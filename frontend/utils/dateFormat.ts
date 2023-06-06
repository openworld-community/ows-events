export const dateFormat = (date: Date) => {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return `${day}.${month}.${year}`;
}
