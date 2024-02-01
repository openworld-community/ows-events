import * as yup from 'yup';

yup.setLocale({
	mixed: {
		required: ({ path }) => ({ key: `validation.required.${path}` }),

		notType: 'validation.notType'
	},
	number: {
		min: ({ min, path }) => ({ key: `validation.min.${path}`, values: { count: min } }),
		max: ({ max, path }) => ({ key: `validation.max.${path}`, values: { count: max } }),
		integer: ({ path }: { path: string }) => ({ key: `validation.integer.${path}` })
	},

	string: {
		matches: ({ path }) => ({ key: `validation.matches.${path}` }),
		min: ({ min, path }) => ({ key: `validation.min.${path}`, values: { count: min } }),
		max: ({ max, path }) => ({ key: `validation.max.${path}`, values: { count: max } })
	}
});

const emailRegexp =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex = /^[a-z,A-Z, 0-9, .,!,?, @,:, ;,*,/,",+,-,,]{6,20}$/;

function isValidEmail(this: yup.StringSchema<string, yup.Maybe<yup.AnyObject>, undefined, ''>) {
	return this.matches(emailRegexp, {
		excludeEmptyStrings: true
	});
}

yup.addMethod(yup.string, 'isValidEmail', isValidEmail);

yup.addMethod(yup.string, 'passwordRegexMethod', function (message: string) {
	return this.matches(passwordRegex, {
		message,
		name: 'password',
		excludeEmptyString: true
	});
});

export * from 'yup';
