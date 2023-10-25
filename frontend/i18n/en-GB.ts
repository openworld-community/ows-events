/// import about from '/locales/en/about';
// import dates from '/locales/en/dates';
// import donate from '/locales/en/donate';
// import ServerErrors from '/locales/en/errors';
// import event from '/locales/en/event';
// import global from '/locales/en/global';
// import header from '/locales/en/header';
// import home from '/locales/en/home';
// import limitation_of_liability from '/locales/en/limitation-of-liability';
// import meta from '/locales/en/meta';
// import modal from '/locales/en/modal';
// import user from '/locales/en/user';
import { CommonErrorsEnum } from '../../common/const/common-errors';
import { EventValidatorErrorTypes } from '../../common/const/event-validation-error'

export default {
	about: {
		title: 'About Us',
		idea: 'At AfishaPeredelano, we aim to make cultural and social life more accessible.',
		mission: 'Our mission is to bring people together based on their interests, enabling them to easily discover and create unique events, from exhibitions and concerts to weekly yoga sessions in the park.',
		functionality: 'Now, information about events of all scales is gathered in one place. Thanks to convenient search and filtering functions, you can organize your leisure activities in just a few minutes.',
		team: 'We are a team of enthusiasts committed to making the world more interesting and socially active. Our developers, designers, and managers work to ensure that your app experience is unforgettable.',
		values: {
			title: 'Our values that guide our work:',
			openness: 'Openness: We believe in the power of communication and openness;',
			innovation: 'Innovation: We constantly seek ways to make our app better;',
			community: 'Community: We strive to create a space where everyone feels welcome;',
			accessibility: 'Accessibility: We make cultural events accessible to all;',
			quality: 'Quality: We maintain high quality, whether for large platforms or small initiatives.'
		},
		github: 'Link to the Project\'s GitHub',
		social: {
			title: 'Follow us on social media:',
			alt: 'Link to the'
		}
	},
	dates: {
		day: {
			key_zero: '{count} days',
			key_one: '{count} day',
			key_few: '{count} days',
			key_many: '{count} days'
		},
	},
	donate: {
		title: 'Become a Part of Our Project!',
		description: 'We invite you to join our creative family and together create something greater than just a list of events. Your support will enable us to develop the project, expand its capabilities, and bring our boldest ideas to life, so we can offer you something truly unique.',
		gratitude: 'Thank you for making our mission possible!',
		subscription: 'With love, the AfishaPeredelano Team.',
		method: {
			title: 'Contribute:',
			patreon: 'Patreon',
			bitcoin: 'Bitcoin',
			ethereum: 'Ethereum',
			usdt: 'USDT',
			usdc: 'USDC'
		}
	},
	error: {
		[EventValidatorErrorTypes.EVENT_IS_NOT_DEFINED]: 'Event is not defined',
		TITLE_IS_NOT_DEFINED: 'Title is not defined',
		TITLE_IS_TOO_SHORT: 'Title is too short',
		TITLE_IS_TOO_LONG: 'Title is too long',
		DESCRIPTION_IS_NOT_DEFINED: 'Description is not defined',
		DESCRIPTION_IS_TOO_SHORT: 'Description is too short',
		DESCRIPTION_IS_TOO_LONG: 'Description is too long',
		START_DATE_IS_NOT_DEFINED: 'Start date is not defined',
		START_DATE_IS_IN_THE_PAST: 'Start date is in the past',
		DURATION_IS_NEGATIVE: 'Duration is negative',
		LOCATION_IS_NOT_DEFINED: 'Location is not defined',
		COUNTRY_IS_NOT_DEFINED: 'Country is not defined',
		CITY_IS_NOT_DEFINED: 'City is not defined',
		IMAGE_LINK_IS_TOO_SHORT: 'Image link is too short',
		IMAGE_LINK_IS_TOO_LONG: 'Image link is too long',
		URL_IS_NOT_DEFINED: 'Event URL is not defined',
		URL_IS_TOO_SHORT: 'Event URL is too short',
		URL_IS_TOO_LONG: 'Event URL is too long',
		TITLE_IS_NOT_CLEAN: 'Inappropriate language in the title',
		DESCRIPTION_IS_NOT_CLEAN: 'Inappropriate language in the description',
		[CommonErrorsEnum.EVENT_NOT_FOUND]: 'Event not found',
		'image-addition-error': 'Error adding image',
		'image-deletion-error': 'Error deleting image',
		'image-encoding-problem': 'Image format error',
		'image-too-large': 'Image file is too large',
		'no-image-to-add': 'Image file not found',
		'no-image-to-delete': 'Image file not found',
		'payment-info-file-parse-error': 'Error in ',
		'payment-info-file-not-exist': 'Payment method not specified',
		'payment-info-not-found': 'Payment method not found',
		'unknown-image-route-error': 'Unexpected error while processing the image',
		'wrong-token': 'Your authentication token is invalid',
		forbidden: 'Access error',
		unauthorized: 'You don\'t have access to this resource',
		'event-already-exists': 'This event already exists',
		'event-sent-on-moderation': 'Event sent for moderation',
		'no-payload-provided': 'Empty request payload sent',
		'timezone-city-not-found': 'Could not find a time zone for the specified parameters',
		'user-does-not-exist': 'User not found'
	},
	event: {
		image: {
			event: 'Event image'
		},
		description_title: 'Event description',
		price: {
			free: 'Free',
			unknown: 'Price not specified',
			from: 'From',
			to: 'To'
		}
	},
	footer: {
		navigation: {
			about: 'About Us',
			support: 'Support',
			donate: 'Support the Project',
			limitation_of_liability: 'Limitation of Liability'
		}
	},
	form: {
		global: {
			required: '* required fields'
		},
		event: {
			title: 'Create Event',
			title_edit: 'Edit Event',
			add_image: 'Add image',
			remove_image: 'Remove image',
			fields: {
				location: 'Location',
				country: 'Country',
				city: 'City',
				address: 'Address',
				address_placeholder: 'Street, house, or location name',
				check_address: 'Check the location for accuracy ',
				// \u00A0 - non-breaking space
				address_link: 'on\u00A0map',
				timezone: 'Timezone',
				main_info: 'General information',
				title: 'Title',
				organizer: 'Organizer',
				description: 'Description',
				start: 'Start',
				end: 'End',
				price: 'Price',
				price_placeholder: 'Price',
				currency_placeholder: 'Currency',
				price_free: 'Free',
				url_to_registration: 'Registration link',
				url_placeholder: 'https://example.com'
			}
		},
	},
	global: {
		country: 'Country',
		city: 'City',
		timezone: 'Timezone',
		button: {
			authorize: 'Authorize',
			add_to_favourites: 'Add to Favorites',
			back: 'Back',
			cancel: 'Cancel',
			close: 'Close',
			confirm: 'Confirm',
			contact: 'Contact',
			copy: 'Copy',
			copied: 'Copied',
			clear: 'Clear',
			delete: 'Delete',
			edit: 'Edit',
			edit_profile: 'Edit profile',
			follow: 'Follow',
			in_favourites: 'In Favourites',
			logout: 'Logout',
			register: 'Register',
			remove_from_favourites: 'Remove from Favorites',
			save: 'Save',
			search: 'Search',
			share: 'Share',
		}
	},
	header: {
		logo: {
			at_home_aria: 'Return to the beginning of the page',
			other_page_aria: 'Return to the home page'
		},
		language_selector: {
			label: 'Select language',
			language: {
				ru: 'Russian',
				en: 'English'
			}
		},
		burger: {
			open: 'Open navigation menu',
			close: 'Close navigation menu'
		},
		navigation: {
			user: 'User',
			authorize: 'Authorize',
			about: 'About us',
			support: 'Support',
			donation: 'Support the Project',
			limitation_of_liability: 'Limitation of Liability',
		},
		subscription_expired: '$t(dates.day.key) until the end of subscription',
	},
	home: {
		title: 'Bringing people together around events',
		button: {
			add_event_aria: 'Add an event'
		},
		events: {
			image_alt: 'Event photo',
			ad: 'Advertisement',
			anchor_chat: 'Go to chat'
		},
		location: {
			aria: 'You are in'
		},
		filter: {
			aria_country: 'Filter by country',
			aria_city: 'Filter by city',
			search: 'What are you interested in?',
		},
		user_location: {
			not_found: 'We couldn\'t find your location'
		}
	},
	limitation_of_liability: {
		title: 'Limitation of Liability',
		last_change: 'Last Modified:',
		p_1_1: 'The administration of the website',
		p_1_2: ' and social networks AfishaPeredelano (hereinafter referred to as "Afisha") does not independently organize events featured on the website',
		p_1_3: ' or on social networks',
		p_1_4: '(hereinafter referred to as "Service"). Whether an event takes place or not depends on third parties, for whose actions Afisha is not responsible and cannot influence. Therefore, Afisha does not guarantee the accuracy of information posted on the Service.',
		p_2: 'Afisha does not guarantee the correct operation of websites linked on the Service. Afisha also does not guarantee compliance of third-party websites with legal requirements. Afisha does not guarantee the confidentiality of user data on third-party websites.',
		p_3: 'Afisha is not responsible and does not compensate any direct or indirect damage caused to the user of the website or any third parties as a result of using or being unable to use the Service and information posted on the Service.',
		p_4: 'Users of the website have the opportunity to independently post content on the Afisha website without the involvement of the administration. Afisha is not obliged to moderate the content posted by users.',
		p_5: 'Afisha does not guarantee the accuracy of information posted by users on the Service. Afisha does not guarantee that events, information about which is posted by users, will take place, and that websites linked by users will operate properly, comply with legal requirements, and ensure the confidentiality of user data.',
		p_6: 'Users who post content on the Service are individually responsible to third parties and state authorities for their actions. By using the Service, the user undertakes not to violate anyone\'s copyright, rights to trademarks, means of individualization, and/or rights to other objects of intellectual property. The user undertakes to independently and at their own expense resolve conflicts with third parties related to the user\'s actions on the Service.',
	p_7: 'The user and third parties undertake to resolve conflicts with Afisha out of court by sending claims through any available communication channels. In case of impossibility to resolve the conflict through pretrial procedures, it shall be settled in accordance with applicable law.',
	p_8: 'The absence of guarantees means that the Afisha and/or any persons directly or indirectly involved in it do not assume any obligations and do not bear any responsibility to the users of the Service and/or any other third parties in connection with the content posted on the Service.'
},
	meta: {
		site_name: 'Afisha Peredelano',
		default_title: 'Events Calendar for Serbia, Montenegro, Kyrgyzstan',
		default_description: 'The catalog features dozens of events across various categories: concerts, meetings, exhibitions, festivals, masterclasses',
		about_us: {
			title: 'About Peredelano Afisha Project',
			description: 'Learn more about our project, team and mission'
		},
		payment_info: {
			title: 'Payment Information'
		},
		donate: {
			title: 'Support the Peredelano Afisha Project',
			description: 'Thanks to your support, we are expanding the project, enhancing its capabilities, and bringing our boldest ideas to life.'
		},
		user: {
			info: {
				title: 'User Profile',
				description: 'Manage your profile and events in your personal account'
			}
		}
	},
	modal: {
		global: {
			required: '* required fields'
		},
		need_authorize_modal: {
			title: 'Authorization required to create an Event',
		},
		delete_event_modal: {
			title: 'Delete event',
		},
		edit_profile: {
			title: 'Edit Profile',
			fields: {
				name: 'How should we address you?',
				name_placeholder: 'Name',
				surname_placeholder: 'Surname',
				nickname: 'Nickname',
				nickname_placeholder: 'Enter a nickname',
				organizer: 'Organizer',
				organizer_placeholder: 'Event organizer name'
			}
		}
	},
	user: {
		unauthorized: {
			title: 'Log into your account',
			text: 'Please log in to access additional features',
			continue: 'Continue without authorization',
		},
		greeting: 'Hello',
		user: 'User',
		my_events: {
			title: 'My events',
			no_my_events: 'You haven\'t created any events yet',
		},
		favourites: {
			title:'Favourites',
			no_favourites: 'You haven\'t added anything to your "Favourites" yet',
		},
		donate: {
			title: 'Become a part of our project!',
			text: 'We invite you to join our creative family and create something special together',
			button: 'Make a contribution'
		}
	}


	// about,
	// dates,
	// donate,
	// error: ServerErrors,
	// event,
	// global,
	// header,
	// home,
	// limitation_of_liability,
	// meta,
	// modal,
	// user,
};
