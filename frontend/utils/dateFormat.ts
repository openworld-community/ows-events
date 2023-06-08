export const dateFormat = (date: Date) => {
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();

	return `${day}.${month}.${year}`;
}

export const timeFormat = (date: Date) => {
	date.toLocaleString([], {
		hour12: false,
	})

	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");

	return `${hours}:${minutes}`;
}
