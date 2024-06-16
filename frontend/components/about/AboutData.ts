export type AboutValuesData = {
	title: string;
	imageUrl: string;
	key: number;
	
};

export const values: Record<string, AboutValuesData> = {
	openness: {
		title: 'about.values.openness',
		imageUrl: '/img/about/openness.png',
		key: 1
		
	},
	innovation: {
		title: 'about.values.innovation',
		imageUrl: '/img/about/innovation.png',
		key: 2
		
	},
	community: {
		title: 'about.values.community',
		imageUrl: '/img/about/community.png',
		key: 3
		
	},
	accessibility: {
		title: 'about.values.accessibility',
		imageUrl: '/img/about/accessibility.png',
		key: 4
		
	},
	quality: {
		title: 'about.values.quality',
		imageUrl: '/img/about/quality.png',
		key: 5
		
	}
};