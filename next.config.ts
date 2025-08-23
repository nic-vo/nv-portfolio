import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	poweredByHeader: false,
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

export default nextConfig;
