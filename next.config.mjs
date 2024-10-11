/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        outputFileTracingIncludes: {
            "/app": ["./prompts/**/*"],
        },
    },
    async redirects() {
        return [
            
        ]
    }
};

export default nextConfig;
