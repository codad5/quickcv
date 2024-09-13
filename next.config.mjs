/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        outputFileTracingIncludes: {
            "/app": ["./prompts/**/*"],
        },
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/resume-generator',
                permanent: true,
            },
        ]
    }
};

export default nextConfig;
