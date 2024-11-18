// module.exports = {
//     output: 'export',
//     basePath: '',
//   };
/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/printerForm1.0",
  output: "export", // <=== enables static exports
  reactStrictMode: true,
  assetPrefix: "/printerForm1.0/",
};

module.exports = nextConfig;
