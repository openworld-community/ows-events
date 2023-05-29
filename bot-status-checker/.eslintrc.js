module.exports = {
	extends: ['eslint:recommended', '../.eslintrc.json'],
	parserOptions: {
		sourceType: 'module',
		project: ['./tsconfig.eslint.json'],
		tsconfigRootDir: __dirname,
		ecmaVersion: 'latest'
	},
	ignorePatterns: ['./node_modules/*']
};
