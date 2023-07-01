module.exports = {
	root: true,
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-typescript',
		'@vue/eslint-config-prettier/skip-formatting',
		'@nuxt/eslint-config'
	],
	parserOptions: {
		sourceType: 'module',
		project: ['./tsconfig.eslint.json'],
		tsconfigRootDir: __dirname,
		ecmaVersion: 'latest'
	},
	ignorePatterns: ['./node_modules/*', './build/*', './dist/*', './assets/*'],
	rules: {
		'vue/html-self-closing': 'off',
		'vue/multi-word-component-names': 'off',
		'vue/html-indent': 'off',
		'vue/singleline-html-element-content-newline': 'off',
		'no-mixed-spaces-and-tabs': 'off',
		'vue/require-default-prop': 'off'
	}
};
