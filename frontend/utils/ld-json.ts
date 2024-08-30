import { SEO_SCHEMA_BASE_URL } from '~/constants/enums/seo';
import type { EventOnPoster } from '../../common/types';
import { VITE_DOMAIN } from '~/constants/url';
import { RoutePathEnum } from '~/constants/enums/route';

export const getJSONEventList = (posterEvents: EventOnPoster[], locale: string) => {
	return {
		type: 'application/ld+json',
		innerHTML: JSON.stringify({
			'@context': SEO_SCHEMA_BASE_URL,
			'@type': 'BreadcrumbList',
			itemListElement: posterEvents.map((event, ind) => {
				return {
					'@type': 'ListItem',
					position: ind + 1,
					item: {
						'@id': `${VITE_DOMAIN}/${locale}${RoutePathEnum.EVENT}/${event.id}`,
						name: event.title
					}
				};
			})
		})
	};
};
