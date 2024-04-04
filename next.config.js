/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: {
				and: [/\.(js|ts|md)x?$/],
			},
			use: ['@svgr/webpack'],
		});
		return config;
	},
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.NODE_ENV === 'development',
});

module.exports = withBundleAnalyzer(nextConfig);
