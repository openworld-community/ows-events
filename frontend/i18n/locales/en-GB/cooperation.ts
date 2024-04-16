import event from './event';
export default {
	header: {
		title: 'Join the Balkan event aggregation platform',
		description: `Our efforts are focused on making the cultural and public space of the Balkans - from Serbia to Montenegro - more accessible and united. We offer the opportunity for event organizers and participants to be part of this transformation through our innovative platform. That's why choosing our startup is a choice in favor of opportunities and advantages:`
	},
	advantages: {
		allEvents: {
			title: 'All events in the region under one roof',
			description: `Our platform offers aggregation of all events of selected categories (${Object.values(
				event.tags
			).join(
				', '
			)}) in the Balkans. This means users can find any event, from parties to business conferences, without leaving our site.`
		},
		simpleCreating: {
			title: 'Easy to create and promote events',
			description:
				'We offer intuitive tools for quickly and easily creating events of any format. This allows organizers to easily share information about their events and attract more participants.'
		},
		individualSearch: {
			title: 'Individual approaches to search',
			description:
				'Using our convenient filters by topic/tag, country and city, users can easily find events that match their interests and preferences.'
		},
		ourSupport: {
			title: 'Support and care at every step',
			description:
				'Our caring support team is always available to help with any questions or concerns. We value every user and strive to provide the best user experience.'
		},
		eventPages: {
			title: 'Event Detail Pages',
			description:
				'Each event on our platform is accompanied by a detailed description and convenient links for communication, which ensures effective interaction between organizers and participants.'
		}
	},
	whyUs: {
		title: 'Why choose us?',
		description1:
			'Choosing our startup is not only about access to a unique event aggregation platform. This is your contribution to the creation of a connecting cultural space in the Balkans, where every event becomes accessible and meaningful. We strive to advance culture and society through technology, inviting you to join our movement.',
		description2: `Be part of our mission. Let's work together to make the cultural and public space of the Balkans more open and integrated. Join us today!`
	},
	ourServices: 'Our services',
	package: {
		basic: {
			title: 'Basic package',
			image: 'link',
			option: [
				'Posting an event announcement on the website',
				'Display in the general list of events',
				'Ability to receive feedback and ratings from users'
			],
			price: 'Free',
			button: 'Select'
		},
		standard: {
			title: 'Standard Package',
			image: 'link',
			option: [
				'All services of the Basic package',
				'Access to detailed event analytics (views, clicks, visitor demographics)',
				`Placement of the organizer's contact information for direct communication with visitors`
			],
			price: '$12000',
			button: 'Select'
		},
		premium: {
			title: 'Premium Package',
			image: 'link',
			option: [
				'All services of the Standard package',
				'Promoting an event to the top search results on the website through an advertising auction system',
				'Integration with the online ticket booking system on the platform',
				'Placement in rotation on the main page of the site and in priority categories'
			],
			price: '$12000',
			button: 'Select'
		}
	},
	additionalServices: {
		title: 'Additional services',
		socialMedia: {
			title: 'Social Media:',
			image: 'link',
			description: `Creating and posting posts about the event on the platform's social networks.`,
			price: '$12000',
			button: 'Select'
		},
		targetedAdvertising: {
			title: 'Targeted advertising:',
			image: 'link',
			description:
				'Launch targeted advertising campaigns on social networks and other platforms to attract the target audience.',
			price: '$12000',
			button: 'Select'
		},
		videoContent: {
			title: 'Video content:',
			image: 'link',
			description:
				'Production and placement of promotional video of the event on the website and social networks.',
			price: '$12000',
			button: 'Select'
		},
		interactiveElements: {
			title: 'Interactive elements:',
			image: 'link',
			description:
				'Organizing online voting, surveys, or competitions to increase engagement.',
			price: '$12000',
			button: 'Select'
		}
	}
};
