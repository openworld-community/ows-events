export const SEO_SCHEMA_BASE_URL = 'https://schema.org/';

// Schema.org URLs

export enum SeoItemTypeEnum {
	OFFER = `${SEO_SCHEMA_BASE_URL}Offer`,
	EVENT = `${SEO_SCHEMA_BASE_URL}Event`,
	ADDRESS = `${SEO_SCHEMA_BASE_URL}PostalAddress`
}

// ITEMPROPS

// Global
export enum SeoItempropGlobalEnum {
	URL = 'url',
	IMAGE = 'image'
}

// Event
export enum SeoItempropEventEnum {
	NAME = 'name',
	DESCRIPTION = 'description',
	ORGANIZER = 'composer',
	START_DATE = 'startDate',
	DURATION = 'duration'
}

// Price
export enum SeoItempropPriceEnum {
	GROUP_ITEMPROP = 'offers',
	PRICE = 'price',
	CURRENCY = 'priceCurrency',
	FREE = 'isAccessibleForFree'
}

// Location
export enum SeoItempropLocationEnum {
	GROUP_ITEMPROP = 'address',
	COUNTRY = 'addressCountry',
	CITY = 'addressLocality',
	ADDRESS = 'location'
}
