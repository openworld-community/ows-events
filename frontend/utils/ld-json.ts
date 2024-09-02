import { SEO_SCHEMA_BASE_URL } from '~/constants/enums/seo';
import type { EventOnPoster } from '../../common/types';
import { VITE_DOMAIN } from '~/constants/url';
import { RoutePathEnum } from '~/constants/enums/route';
import type { LocationQuery } from '#vue-router';

export const getJSONEventList = (
	posterEvents: EventOnPoster[],
	locale: string,
	query?: LocationQuery
) => {
	return {
		type: 'application/ld+json',
		innerHTML: JSON.stringify({
			'@context': SEO_SCHEMA_BASE_URL,
			type: 'BreadcrumbList',
			itemListElement: posterEvents.map((event, ind) => {
				return {
					'@type': 'ListItem',
					position: ind + 1,
					item: {
						'@id': `${VITE_DOMAIN}/${locale}${RoutePathEnum.EVENT}/${event.id}`,
						name: event.title
					}
				};
			}),
			potentialAction: {
				'@type': 'SearchAction',
				target: `${VITE_DOMAIN}/${locale}${RoutePathEnum.CITY}?q=${query}`,
				query: 'nonrequired'
			}
		})
	};
};
