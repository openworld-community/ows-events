import type { SitemapUrl } from '#sitemap/types';
import { type EventOnPoster } from '../../../../common/types';

export default defineSitemapEventHandler(async () => {
	const eventRoutes = await getEventsRoutes();
	const countryRoutes = await getCountryRoutes();
	const cityRoutes = await getCityRoutes();
	return [...eventRoutes, ...cityRoutes, ...countryRoutes];
});

const getEventsRoutes = async () => {
	const config = useRuntimeConfig();
	const data = await fetch(`${config.public.apiUrl}/events`);
	const json = await data.json();
	return json.map((event: EventOnPoster) => {
		return {
			loc: `/event/${event.id}`,
			_i18nTransform: true
		} satisfies SitemapUrl;
	});
};

const getCityRoutes = async () => {
	const config = useRuntimeConfig();
	const data = await fetch(`${config.public.apiUrl}/location/usedCities`);
	const json = await data.json();
	return json.map((city: { en: string; ru: string; countryCode: string }) => {
		return {
			loc: `/city/${city.en.toLowerCase()}`,
			_i18nTransform: true
		} satisfies SitemapUrl;
	});
};

const getCountryRoutes = async () => {
	const config = useRuntimeConfig();
	const data = await fetch(`${config.public.apiUrl}/location/usedCountries`);
	const json = await data.json();
	return json.map((country: string) => {
		return {
			loc: `/country/${country.toLowerCase()}`,
			_i18nTransform: true
		} satisfies SitemapUrl;
	});
};
