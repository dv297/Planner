declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_BYPASS: string;
    GOOGLE_AUTH_CLIENT_ID: string;
    GOOGLE_AUTH_CLIENT_SECRET: string;
    NODE_ENV: string;
    CYPRESS_BASE_URL: string;
    SENDGRID_API_KEY: string;
  }
}
