/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	eslint: {
		ignoreDuringBuilds: true
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]s$/,
			use: ['@svgr/webpack']
		})
		return config;
	}
};

module.exports = nextConfig;
