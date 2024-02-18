export default {
	notType: 'Wrong type',
	matches: {
		url: 'The value entered must be a valid link',
		email: '',
		password: ''
	},
	required: {
		price: {
			val: 'Enter positive integer number',
			currency: 'Choose currency'
		},
		location: {
			country: 'Enter name of the country',
			city: 'Enter name of the city',
			address: 'Enter address'
		},
		timezone: 'Enter timezone',
		title: 'Title is required',
		description: 'Description is required',
		startDate: 'Start date is required',
		startTime: 'Start time is required',
		endTime: 'Enter send date'
	},
	max: {
		tags: 'Number of tags should be no more then {count}',
		description: 'Description should be no more then {count} total in length',
		title: 'Title should be no more then {count} total in length'
	},
	positive: {
		price: {
			val: 'Price should be positive number'
		}
	},
	test: {
		endDate: 'End date can not be less then start date',
		endTime: 'End time can not be less then start time',
		price: {
			val: 'Price should be positive integer number'
		}
	},
	image: {
		size: 'File size is greater then 2Mb.',
		problemSever: 'Something wring.'
	},
	hints: {
		tags: 'Number of tags should be no more then 6',
		image: 'jpg, jpeg, png, webp <= 2Mb',
		extension: 'Choose jpg, jpeg, png, webp file'
	}
};
