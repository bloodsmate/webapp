/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/webp'],
        deviceSizes: [320, 420, 768, 1024, 1200],
        imageSizes: [16, 32, 48, 64, 96],
        domains: ["res.cloudinary.com"],
    },
};

export default nextConfig;
