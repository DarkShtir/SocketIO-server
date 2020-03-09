module.exports = {
	env: {
		commonjs: true,
		es6: true,
		node: true,
	},
	extends: 'plugin:prettier/recommended',
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2018,
	},
	extends: ['prettier'],
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': 'error',
		singleQuote: true,
	},
};
