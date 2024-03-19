import { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	eslint: {
		ignoreDuringBuilds: true
	},
	webpack(config: NextConfig) {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: {
				and: [/\.(js|ts|md)x?$/]
			},
			use: ['@svgr/webpack']
		});
		return config;
	}
};

module.exports = nextConfig;
