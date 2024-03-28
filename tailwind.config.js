const defaultColors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: ['sans-serif'],
			serif: ['serif'],
			mono: ['monospace'],
		},
		colors: {
			...defaultColors,
			white: '#D6E5E3',
			black: '#0c1821',
		},
		extend: {},
	},
	plugins: [],
};
