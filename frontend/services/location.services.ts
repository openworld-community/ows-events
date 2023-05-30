import { LOCATION_API_URL } from '@/constants/url';
import { UserLocation } from '../../common/types/location';

export const getUserLocation = async (): Promise<UserLocation> => {
	let result: {} | UserLocation = {};
	await api.get(LOCATION_API_URL).then(({ data }) => {
		result = {
			code: data?.location?.country?.code,
			city: data?.location?.city,
			country: data?.location?.country?.name
		};
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
