// eslint-disable-next-line @typescript-eslint/no-var-requires
const removeImports = require('next-remove-imports')();

module.exports = removeImports({
  reactStrictMode: true,
  images: {
    domains: ['tailwindui.com', 'avatars.githubusercontent.com'],
  },
});
