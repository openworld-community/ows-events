import { DEFAULT_IMAGE_URL, VITE_DOMAIN } from '../constants/url';

type MetaData = {
	title: string | undefined;
	description?: string | undefined;
	image?: string | undefined;
};

// title должен передаваться всегда
// description передается, если отличается от default_description
// image передается, если от отличается от дефолтного

export const getMeta = (meta: MetaData) => {
	const route = useRoute();
	const { t } = useI18n();
	return useSeoMeta({
		title: meta.title as string,
		description: (meta.description as string) ?? t('meta.default_description'),
		ogSiteName: t('meta.site_name'),
		ogType: 'website',
		ogTitle: meta.title as string,
		ogDescription: (meta.description as string) ?? t('meta.default_description'),
		ogImage: (meta.image as string) ?? DEFAULT_IMAGE_URL,
		ogImageWidth: 1200,
		ogImageHeight: 630,
		ogUrl: VITE_DOMAIN + route.path,
		twitterCard: 'summary_large_image',
		twitterImage: meta.image ?? DEFAULT_IMAGE_URL,
		twitterTitle: meta.title as string,
		twitterDescription: (meta.description as string) ?? t('meta.default_description'),
		twitterSite: t('meta.site_name')
	});
};
