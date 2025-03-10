import { SEO_SCHEMA_BASE_URL, SeoItemTypeEnum } from '~/constants/enums/seo';
import type { EventOnPoster } from '../../common/types';
import { RoutePathEnum } from '~/constants/enums/route';
import { convertEventDateToISOString } from './dates';

export const getJSONEventList = (posterEvents: EventOnPoster[], locale: string, path: string) => {
	const config = useRuntimeConfig();
	return {
		type: 'application/ld+json',
		innerHTML: JSON.stringify({
			'@context': SEO_SCHEMA_BASE_URL,

			'@type': 'ItemList',
			name: 'Event Items',

			itemListElement: posterEvents.map((event, ind) => {
				return {
					'@type': 'ListItem',
					position: ind + 1,
					item: {
						'@id': `${config.public.domain}/${locale}${RoutePathEnum.EVENT}/${event.id}`,
						name: event.title
					}
				};
			}),

			url: `${config.public.domain}${path}`,
			potentialAction: {
				'@type': 'SearchAction',
				target: `${config.public.domain}${path}?{query}`,
				query: 'required'
			}
		})
	};
};

export const getJSONEvent = (posterEvent: EventOnPoster) => {
	if (process.server) return;
	return {
		type: 'application/ld+json',
		innerHTML: JSON.stringify({
			'@context': SEO_SCHEMA_BASE_URL,
			'@type': 'Event',
			name: posterEvent.title,
			startDate: convertEventDateToISOString(
				posterEvent.date,
				posterEvent.isOnline,
				posterEvent.timezone
			),
			endDate: posterEvent.durationInSeconds
				? convertEventDateToISOString(
						posterEvent.date + posterEvent.durationInSeconds * 1000,
						posterEvent.isOnline,
						posterEvent.timezone
				  )
				: undefined,
			eventAttendanceMode: posterEvent.isOnline
				? SeoItemTypeEnum.ONLINE
				: SeoItemTypeEnum.OFFLINE,
			location: posterEvent.isOnline
				? {
						'@type': 'VirtualLocation',
						url: posterEvent.url
				  }
				: {
						'@type': 'Place',
						address: {
							'@type': 'PostalAddress',
							streetAddress: posterEvent.location.address,
							addressCountry: posterEvent.location.address
						}
				  },
			image: posterEvent.image ? [posterEvent.image] : undefined,
			description: posterEvent.description,
			offers: {
				'@type': 'Offer',
				url: posterEvent.url,
				price: posterEvent.price?.value,
				priceCurrency: posterEvent.price?.currency
			},

			organizer: posterEvent?.organizer
				? {
						'@type': 'Organization',
						name: posterEvent.organizer
				  }
				: undefined
		})
	};
};
