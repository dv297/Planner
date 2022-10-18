<img alt="Logo" height="90.5" src="./public/images/logo/logo-no-background.svg" width="500"/>
---

<p>
  <a href="https://www.npmjs.com/package/planner" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/planner.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/thedanielvu" target="_blank">
    <img alt="Twitter: thedanielvu" src="https://img.shields.io/twitter/follow/thedanielvu.svg?style=social" />
  </a>
</p>

> A Jira-like clone for learning Next.JS, Tailwind, and Next-Auth

### ✨ Screenshots

<img height="500" src="screenshots/Sizzy-MacBook Air localhost 17Oct 17.16.png" width="921"/>

<img height="500" src="screenshots/Sizzy-MacBook Air localhost 17Oct 17.10.png" width="921"/>

<img height="500" src="screenshots/Sizzy-MacBook Air localhost 17Oct 17.10.png" width="921"/>

### ✨ [Demo](https://planner-nine.vercel.app/)

### ✨ [Blog Outlining Thoughts During Development](https://planner-nine.vercel.app/blog)

## Install

```sh
npm install
```

## Usage

```sh
npm run start
```

## Author

👤 **Daniel Vu**

- Website: https://daniel-vu.com/
- Twitter: [@thedanielvu](https://twitter.com/thedanielvu)
- Github: [@dv297](https://github.com/dv297)
- LinkedIn: [@daniel-vu-a2576699](https://linkedin.com/in/daniel-vu-a2576699)

## Developer Notes

### Installation

This project uses NPM. To pull dependencies, run `npm ci`.

Beyond Node.js, this project requires various external technologies to get up and running. These include...

- PostgreSQL
- Redis
- Twilio SendGrid
- Google Application Authentication Credentials
- Github Application Authentication Credentials
- Sanity.io

Running `docker-compose up -d` will configure PostgreSQL and Redis. You will need to sign up and configure the remainder
to get the values needed for the environment variables for this application.

A `local.env` file outlines the various environment variables that are required.

### Testing

This project is configured with Cypress for end-to-end testing. To run the tests, ensure your .env is configured with
environment variables pointing to a running PostgreSQL database that contains the proper schema. **The database will be
wiped once the tests are started**.

From there, you can run `npm run e2e` to start Cypress. You can also run `npm run e2e:headless` to run the tests in a
headless browser.

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
