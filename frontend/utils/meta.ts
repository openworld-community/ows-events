import { BASE_URL } from '../constants/url';

type MetaData = {
	title: string | undefined;
	description: string | undefined;
	image?: string | undefined;
};

export const getMeta = (meta: MetaData) => {
	const route = useRoute();
	const { t } = useI18n();
	return useSeoMeta({
		// для реактивных тегов используем () => value
		title: () => meta.title as string,
		description: () => meta.description as string,
		ogSiteName: () => t('meta.site_name'),
		ogType: 'website',
		ogTitle: () => meta.title as string,
		ogDescription: () => meta.description as string,
		ogImage: (meta.image as string) ?? undefined,
		ogUrl: () => BASE_URL + route.path,
		twitterCard: meta.image ? 'summary_large_image' : 'summary'
	});
};
