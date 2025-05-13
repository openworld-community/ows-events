import { useRuntimeConfig } from 'nuxt/app';

type MetaData = {
	title: string | undefined;
	description?: string | undefined;
	keywords?: string | undefined;
	image?: string | undefined;
};

// title должен передаваться всегда
// description передается, если отличается от default_description
// image передается, если от отличается от дефолтного

export const getMeta = (meta: MetaData) => {
	const config = useRuntimeConfig();
	const DEFAULT_IMAGE_URL = `${config.public.baseUrl}/image/url-image`;
	const route = useRoute();
	const { locale, t } = useI18n();
	return useSeoMeta({
		title: meta.title as string,
		description: (meta.description as string) ?? t('meta.default_description'),
		keywords: (meta.keywords as string) ?? t('meta.default_keywords'),
		ogSiteName: t('meta.site_name'),
		ogType: 'website',
		ogTitle: meta.title as string,
		ogDescription: (meta.description as string) ?? t('meta.default_description'),
		ogImage: (meta.image as string) ?? `${DEFAULT_IMAGE_URL}-${locale.value}.jpeg`,
		ogImageWidth: 1200,
		ogImageHeight: 630,
		ogLocale: locale.value,
		ogUrl: config.public.domain + route.path,
		twitterCard: 'summary_large_image',
		twitterImage: meta.image ?? `${DEFAULT_IMAGE_URL}-${locale.value}.jpeg`,
		twitterTitle: meta.title as string,
		twitterDescription: (meta.description as string) ?? t('meta.default_description'),
		twitterSite: t('meta.site_name')
	});
};
