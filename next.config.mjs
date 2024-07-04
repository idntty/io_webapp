/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  //
  trailingSlash: false,
  reactStrictMode: false,
};

export default nextConfig;

const cspHeader = `script-src 'unsafe-eval'`;

export async function headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: cspHeader.replace(/\n/g, ''),
        },
      ],
    },
  ];
}
