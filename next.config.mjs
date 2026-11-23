// GitHub Actions থেকে BASE_PATH আসে (যেমন /my-repo)। লোকালে খালি থাকে।
const basePath = process.env.BASE_PATH || ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
