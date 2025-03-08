/** @type {import('next').NextConfig} */

// const isGithubPages = process.env.PAGES_GITHUB === 'true';
// const repoName = 'webapp';
// const orgName = 'bloodsmate';

const nextConfig = {
    // basePath: isGithubPages ? `/${repoName}` : '',
    // assetPrefix: isGithubPages ? `/${orgName}/${repoName}/` : '',
    output: 'export',
    images: {
        unoptimized: true,
        // loader: 'cloudinary',
        // publicId: 'your_cloud_name',
        // format: 'auto',
        // transformation: [{ width: 300, height: 300, crop: 'fill' }],
        // quality: 100,
        formats: ['image/webp'],
        deviceSizes: [320, 420, 768, 1024, 1200],
        imageSizes: [16, 32, 48, 64, 96],
        domains: ["res.cloudinary.com"],
    },
    // distDir: 'dist',
    reactStrictMode: true,
    swcMinify: true,
    trailingSlash: true,
};

export default nextConfig;
