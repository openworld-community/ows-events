import { api } from '@/helpers/axios';
import { LOCATION_API_URL } from '@/constants/url';

export type UserLocation = {
	code?: string;
	city?: string;
	country?: string;
};

export const getUserLocation = async (): Promise<UserLocation | null> => {
	let result: null | UserLocation = null;
	await api
		.get(LOCATION_API_URL)
		.then(({ data }) => {
			result = {
				code: data?.location?.code,
				city: data?.city,
				country: data?.location?.name
			};
		})
		.catch((err) => {
			throw Error(err);
		});
	return result;
};

export const getCountries = async (): Promise<string[]> => {
	const { data } = await api.get('/location/countries');
	return data;
};

export const getCitiesByCountry = async (country: string): Promise<string[]> => {
	const { data } = await api.get(`/location/cities/${country}`);
	return data;
};
