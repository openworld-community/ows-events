export type AboutValuesData = {
	title: string;
	imageUrl: string;
	
};

export const values: Record<string, AboutValuesData> = {
	openness: {
		title: 'about.values.openness',
		imageUrl: '/img/about/openness.png'
	},
	innovation: {
		title: 'about.values.innovation',
		imageUrl: '/img/about/innovation.png'
	},
	community: {
		title: 'about.values.community',
		imageUrl: '/img/about/community.png'
	},
	accessibility: {
		title: 'about.values.accessibility',
		imageUrl: '/img/about/accessibility.png'
	},
	quality: {
		title: 'about.values.quality',
		imageUrl: '/img/about/quality.png'
	}
};
