export const SEO_SCHEMA_BASE_URL = 'https://schema.org/';

// Schema.org URLs

export enum SeoItemTypeEnum {
	OFFER = `${SEO_SCHEMA_BASE_URL}Offer`,
	EVENT = `${SEO_SCHEMA_BASE_URL}Event`,
	DATE = `${SEO_SCHEMA_BASE_URL}DateTime`,
	LOCATION = `${SEO_SCHEMA_BASE_URL}Place`,
	ADDRESS = `${SEO_SCHEMA_BASE_URL}PostalAddress`,
	ABOUT = `${SEO_SCHEMA_BASE_URL}AboutPage`,
	DONATE = `${SEO_SCHEMA_BASE_URL}DonateAction`,
	DONATE_METHOD = `${SEO_SCHEMA_BASE_URL}MoneyTransfer`,
	HEADER = `${SEO_SCHEMA_BASE_URL}WPHeader`,
	NAV = `${SEO_SCHEMA_BASE_URL}SiteNavigationElement`,
	URL = `${SEO_SCHEMA_BASE_URL}URL`,
	ORGANIZATION = `${SEO_SCHEMA_BASE_URL}Organization`,
	USER = `${SEO_SCHEMA_BASE_URL}Person`,
	QA_PAGE = `${SEO_SCHEMA_BASE_URL}QAPage`,
	QUESTION = `${SEO_SCHEMA_BASE_URL}Question`,
	ANSWER = `${SEO_SCHEMA_BASE_URL}Answer`
}

// ITEMPROPS

// Global
export enum SeoItempropGlobalEnum {
	URL = 'url',
	IMAGE = 'image',
	TITLE = 'name',
	DESCRIPTION = 'description'
}

// Event
export enum SeoItempropEventEnum {
	NAME = 'name',
	DESCRIPTION = 'description',
	ORGANIZER = 'organizer',
	START_DATE = 'startDate',
	END_DATE = 'endDate',
	LOCATION = 'location',
	CATEGORY = 'about',
	AGE = 'audience'
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
	GROUP_ITEMPROP = 'location',
	MAP = 'hasMap',
	COUNTRY = 'addressCountry',
	CITY = 'addressLocality',
	ADDRESS = 'streetAddress',
	NAME = 'name'
}

// Donation
export enum SeoItempropDonateEnum {
	GROUP_ITEMPROP = 'potentialAction',
	METHOD = 'instrument',
	LINK = 'target'
}

// About Page
export enum SeoItempropAboutEnum {
	MAIN_CONTENT = 'mainContentOfPage',
	IMAGE = 'primaryImageOfPage',
	SIGNIFICANT_LINK = 'significantLink',
	SOCIAL_LINK = 'sameAs'
}

// Navigation
export enum SeoItempropNavEnum {
	NAME = 'name',
	URL = 'url'
}

// URL
export enum SeoItempropURLEnum {
	FEEDBACK_POLITY = 'actionableFeedbackPolicy'
}

// Organization
export enum SeoItempropOrganizationEnum {
	BRAND = 'brand',
	PUBLISHING_PRINCIPLES = 'publishingPrinciples'
}

// User
export enum SeoItempropUserEnum {
	name = 'name',
	nickname = 'alternateName',
	company = 'affiliation'
}
