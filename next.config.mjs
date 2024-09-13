/** @type {import('next').NextConfig} */
const nextConfig = {

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
