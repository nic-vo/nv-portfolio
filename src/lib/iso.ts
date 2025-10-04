export const siteURL = (relative: string) =>
    new URL(
        relative,
        process.env.NODE_ENV === 'development'
            ? 'https://localhost:3000'
            : 'https://nicvo.dev',
    );
