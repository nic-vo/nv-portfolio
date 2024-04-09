/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				white: '#D6E5E3',
				black: '#0c1821',
			},
			fontFamily: {
				overpass: 'var(--font-overpass), serif, ui-serif, system-ui',
				poppins: 'var(--font-poppins), sans-serif, ui-sans-serif, system-ui',
				lato: 'var(--font-lato), sans-serif, ui-sans-serif, system-ui',
				jbmono: 'var(--font-jbmono), monospace, ui-monospace, system-ui',
			},
			keyframes: {
				fadein: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 },
				},
			},
			animation: {
				fadein: 'fadein 0.5s ease 0s 1 normal both',
			},
		},
	},
	plugins: [],
};
