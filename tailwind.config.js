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
		extend: {
			colors: {
				white: '#D6E5E3',
				black: '#0c1821',
			},
		},
	},
	plugins: [],
};
