/* eslint-disable @typescript-eslint/no-var-requires */
const removeImports = require('next-remove-imports')();

module.exports = removeImports(
  removeImports({
    reactStrictMode: true,
    images: {
      domains: ['tailwindui.com', 'avatars.githubusercontent.com'],
    },
  })
);
