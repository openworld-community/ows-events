// vetur.config.js
/** @type {import('vls').VeturConfig} */
module.exports = {
	settings: {
		'vetur.useWorkspaceDependencies': false,
		'vetur.experimental.templateInterpolationService': true
	},
	projects: [
		{
			root: './frontend',
			package: './package.json',
			tsconfig: './tsconfig.json'
		}
	]
};
