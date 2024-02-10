import * as yup from 'yup';

yup.setLocale({
	mixed: {
		required: ({ path }) => ({ key: `validation.required.${path}` }),

		notType: 'validation.notType'
	},
	number: {
		min: ({ min, path }) => ({ key: `validation.min.${path}`, values: { count: min } }),
		max: ({ max, path }) => ({ key: `validation.max.${path}`, values: { count: max } }),
		integer: ({ path }: { path: string }) => ({ key: `validation.integer.${path}` }),
		positive: ({ path }: { path: string }) => ({ key: `validation.positive.${path}` })
	},

	string: {
		matches: ({ path }) => ({ key: `validation.matches.${path}` }),
		min: ({ min, path }) => ({ key: `validation.min.${path}`, values: { count: min } }),
		max: ({ max, path }) => ({ key: `validation.max.${path}`, values: { count: max } })
	},
	array: {
		max: ({ max, path }) => ({ key: `validation.max.${path}`, values: { count: max } })
	}
});

const emailRegexp =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex = /^[a-z,A-Z, 0-9, .,!,?, @,:, ;,*,/,",+,-,,]{6,20}$/;

const linkRegexp =
	/^(https?):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/;

//  https://fjhjh.ru/blog/?name=struct-url&topic=expl#h1

// (https?):\/\/ validate protocol  https://

//(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)    validate domain name:  fjhjh.ru/blog

//(\/[-a-z\d%_.~+]*)*       validate path:  /blog

// (\?[;&a-z\d%_.~+=-]*) validate query:  ?name=struct-url&topic=expl

//  ?(#[-a-z\d_]*)?$/  link to the part of the page:  #h1

function isValidLink(this: yup.StringSchema<string, yup.Maybe<yup.AnyObject>, undefined, ''>) {
	return this.matches(linkRegexp, {
		excludeEmptyStrings: true
	});
}

yup.addMethod(yup.string, 'isValidLink', isValidLink);

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
