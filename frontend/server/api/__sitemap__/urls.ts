import type { SitemapUrl } from '#sitemap/types';
import type {
	ICitySitemapData,
	ICountrySitemapData,
	IEventSitemapData
} from '../../../../common/types/service';
import { transformToQuery } from '~/utils';

export default defineSitemapEventHandler(async () => {
	const eventRoutes = await getEventsRoutes();
	const countryRoutes = await getCountryRoutes();
	const cityRoutes = await getCityRoutes();
	return [...eventRoutes, ...cityRoutes, ...countryRoutes];
});

const getEventsRoutes = async () => {
	const config = useRuntimeConfig();
	const data = await fetch(`${config.public.apiUrl}/service/sitemap/events`);
	const json: IEventSitemapData[] = await data.json();
	return json.map((event) => {
		return {
			loc: `/event/${event.id}`,
			lastmod: event.updatedAt,
			_i18nTransform: true
		} satisfies SitemapUrl;
	});
};

const getCityRoutes = async () => {
	const config = useRuntimeConfig();
	const data = await fetch(`${config.public.apiUrl}/service/sitemap/cities`);
	const json: ICitySitemapData[] = await data.json();
	return json.map((city) => {
		return {
			loc: `/city/${transformToQuery(city.city)}`,
			lastmod: city.updatedAt,
			_i18nTransform: true
		} satisfies SitemapUrl;
	});
};

const getCountryRoutes = async () => {
	const config = useRuntimeConfig();
	const data = await fetch(`${config.public.apiUrl}/service/sitemap/countries`);
	const json: ICountrySitemapData[] = await data.json();
	return json.map((country) => {
		return {
			loc: `/country/${transformToQuery(country.country)}`,
			lastmod: country.updatedAt,
			_i18nTransform: true
		} satisfies SitemapUrl;
	});
};
