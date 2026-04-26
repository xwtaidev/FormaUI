import createMDX from "@next/mdx";

const withMDX = createMDX({});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  transpilePackages: ["@formaui/components", "@formaui/blocks"],
  async redirects() {
    return [
      {
        source: "/landing",
        destination: "https://formaui.com/",
        permanent: true
      },
      {
        source: "/landing/architecture",
        destination: "https://formaui.com/product",
        permanent: true
      },
      {
        source: "/landing/reuse-blocks",
        destination: "https://formaui.com/showcase",
        permanent: true
      },
      {
        source: "/landing/:path*",
        destination: "https://formaui.com/",
        permanent: true
      }
    ];
  }
};

export default withMDX(nextConfig);
