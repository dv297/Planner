/* eslint-disable @typescript-eslint/no-var-requires */
const removeImports = require('next-remove-imports')();
const withTM = require('next-transpile-modules')(['react-dnd']);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(
  withTM(
    removeImports(
      removeImports({
        reactStrictMode: true,
        images: {
          domains: [
            'tailwindui.com',
            'avatars.githubusercontent.com',
            'cdn.sanity.io',
          ],
        },
      })
    )
  )
);
