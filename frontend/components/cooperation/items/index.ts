import { COOPERATION_PRICING } from '~/constants/defaultValues/cooperation-pricing';
export type Advantage = {
	title: string;
	description: string;
	image: string;
	isRevercedText: boolean;
};

export type Additional = {
	title: string;
	description: string;
	price: number;
	button: string;
	image: string;
};

export type Services = {
	title: string;
	options: string;
	price: number;
	button: string;
	image: string;
};

export const advantage: Record<string, Advantage> = {
	unity: {
		title: 'cooperation.advantages.allEvents.title',
		description: 'cooperation.advantages.allEvents.description',
		image: '/img/cooperation/advantage/allEvents.png',
		isRevercedText: false
	},
	simplicity: {
		title: 'cooperation.advantages.simpleCreating.title',
		description: 'cooperation.advantages.simpleCreating.description',
		image: '/img/cooperation/advantage/simpleCreating.png',
		isRevercedText: true
	},
	individuality: {
		title: 'cooperation.advantages.individualSearch.title',
		description: 'cooperation.advantages.individualSearch.description',
		image: '/img/cooperation/advantage/individualSearch.png',
		isRevercedText: false
	},
	care: {
		title: 'cooperation.advantages.ourSupport.title',
		description: 'cooperation.advantages.ourSupport.description',
		image: '/img/cooperation/advantage/ourSupport.png',
		isRevercedText: true
	},
	pages: {
		title: 'cooperation.advantages.eventPages.title',
		description: 'cooperation.advantages.eventPages.description',
		image: '/img/cooperation/advantage/eventPages.png',
		isRevercedText: false
	}
};

export const services: Record<string, Services> = {
	basic: {
		title: 'cooperation.service.basic.title',
		options: 'cooperation.service.basic.option',
		price: COOPERATION_PRICING.services.basic.price,
		button: 'cooperation.service.basic.button',
		image: '/img/cooperation/service/basic.png'
	},
	standard: {
		title: 'cooperation.service.standard.title',
		options: 'cooperation.service.standard.option',
		price: COOPERATION_PRICING.services.standard.price,
		button: 'cooperation.service.standard.button',
		image: '/img/cooperation/service/standard.png'
	},
	premium: {
		title: 'cooperation.service.premium.title',
		options: 'cooperation.service.premium.option',
		price: COOPERATION_PRICING.services.premium.price,
		button: 'cooperation.service.premium.button',
		image: '/img/cooperation/service/premium.png'
	}
};

export const additional: Record<string, Additional> = {
	social: {
		title: 'cooperation.additionalServices.socialMedia.title',
		description: 'cooperation.additionalServices.socialMedia.description',
		price: COOPERATION_PRICING.additionalServices.social.price,
		button: 'cooperation.additionalServices.socialMedia.button',
		image: '/img/cooperation/additional/socialMedia.png'
	},
	target: {
		title: 'cooperation.additionalServices.targetedAdvertising.title',
		description: 'cooperation.additionalServices.targetedAdvertising.description',
		price: COOPERATION_PRICING.additionalServices.target.price,
		button: 'cooperation.additionalServices.targetedAdvertising.button',
		image: '/img/cooperation/additional/targetedAdvertising.png'
	},
	video: {
		title: 'cooperation.additionalServices.videoContent.title',
		description: 'cooperation.additionalServices.videoContent.description',
		price: COOPERATION_PRICING.additionalServices.video.price,
		button: 'cooperation.additionalServices.videoContent.button',
		image: '/img/cooperation/additional/videoContent.png'
	},
	interactive: {
		title: 'cooperation.additionalServices.interactiveElements.title',
		description: 'cooperation.additionalServices.interactiveElements.description',
		price: COOPERATION_PRICING.additionalServices.interactive.price,
		button: 'cooperation.additionalServices.interactiveElements.button',
		image: '/img/cooperation/additional/interactiveElements.png'
	}
};
