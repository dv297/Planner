/* eslint-disable @typescript-eslint/no-var-requires */
const removeImports = require('next-remove-imports')();
const withTM = require('next-transpile-modules')(['react-dnd']);

module.exports = withTM(
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
);
