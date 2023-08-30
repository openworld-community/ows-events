export const modal = {
	new_event_modal: {
		title: 'Add new event',
		title_edit: 'Edit event',
		cancel: 'Cancel',
		submit: 'Save',
		add_image: 'Add photo',
		remove_image: 'Remove photo',
		fields: {
			location: 'Location',
			country: 'Country',
			city: 'City',
			address: 'Address',
			address_placeholder: 'Street, building, or location name',
			check_address: 'Check the accuracy of location display ',
			// \u00A0 - non-breaking space
			address_link: 'on\u00A0map',
			timezone: 'Timezone',
			main_info: 'General information',
			title: 'Title',
			description: 'Description',
			start: 'Start',
			end: 'End',
			price: 'Price',
			price_placeholder: 'Price',
			currency_placeholder: 'Currency',
			url_to_registration: 'Registration link',
			url_placeholder: 'https://example.com'
		}
	},
	need_authorize_modal: {
		title: 'Authorization required to create an event',
		button: {
			close: 'Close'
		}
	},
	delete_event_modal: {
		title: 'Delete event',
		button: {
			cancel: 'Cancel',
			submit: 'Confirm'
		}
	},
	edit_profile: {
		title: 'Edit profile',
		fields: {
			name: 'How should we address you?',
			name_placeholder: 'First name',
			surname_placeholder: 'Last name',
			nickname: 'Nickname',
			nickname_placeholder: 'Enter your nickname',
			organizer: 'Organizer',
			email: 'E-mail',
			phone: 'Phone number',

			organizer_placeholder: 'Event organizer name'
		}
	}
};