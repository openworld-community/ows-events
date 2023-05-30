export type EventOnPoster = {
	id: string;
	title: string;
	description: string;
	date: number;
	durationInSeconds: number;
	location: {
		country: string;
		city: string;
	};
	image: string | null;
	price: number;
	timezone?: {
		timezoneName: string;
		timezoneOffset: string;
	};
	url: string;
};

export type PostEventPayload = {
	title: string;
	description: string;
	date: number;
	durationInSeconds: number;
	location: {
		country: string;
		city: string;
	};
	price: number;
	timezone: string;
	url: string;
};
