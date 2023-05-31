// создает дату, используя компоненты в местной временной зоне

export const dateTime = (date: string, time: string, timezone: string) => {
	return new Date(`${date} ${time} ${timezone}`);
};

export const timestampParse = (
	timestamp: number,
	timezone: { timezoneName: string; timezoneOffset: string } | undefined
) => {
	try {
		const date = new Date(timestamp)
			.toLocaleString('ru-RU', {
				timeZone: timezone?.timezoneName,
				day: 'numeric',
				month: 'numeric',
				year: 'numeric'
			})
			.split('.')
			.reverse()
			.join('-');

		const time = new Date(timestamp).toLocaleString('ru-RU', {
			timeZone: timezone?.timezoneName,
			hour: '2-digit',
			minute: '2-digit'
		});

		return [date, time];
	} catch (e) {
		console.error(e);
		return ['', ''];
	}
};

export const day = 1000 * 60 * 60 * 24;

// Second date getTime() must be greater than firstDate
export const getDatesDayDifference = (firstDate: Date, secondDate: Date): number => {
	const diffTime = Math.abs(secondDate.getTime() - firstDate.getTime());
	return Math.ceil(diffTime / day);
};

export const convertToLocaleString = (
	date: number,
	timezone: { timezoneName: string; timezoneOffset: string } | undefined
) => {
	try {
		const localDate = new Date(date);
		return localDate.toLocaleString('ru-RU', {
			timeZone: timezone?.timezoneName,
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	} catch (e) {
		console.error(e);
		return '';
	}
};
