let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  async redirects() {
    const slugs = [
      'cagefantasy',
      'arxivisual',
      'ford',
      'baba',
      'assembl3d',
      'traffic',
      'watonomous',
      'govcanada',
      'asd',
      'preppal',
      'v2world',
      'landingx',
      'codeninjas',
      'v1world',
      'tks',
      'hippocampus',
    ];
    return slugs.map((slug) => ({
      source: `/experiences/${slug}`,
      destination: `/${slug}`,
      permanent: true,
    }));
  },
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig
