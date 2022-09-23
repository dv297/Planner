declare namespace NodeJS {
  interface ProcessEnv {
    BASE_URL: string;
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
    EMAIL_FROM_ADDRESS: string;
    TEST_ENVIRONMENT_EMAIL_TO_ADDRESS: string;
    NEXT_PUBLIC_SANITY_PROJECT_ID: string;
    NEXT_PUBLIC_SANITY_DATASET: string;
    NEXT_PUBLIC_SANITY_TOKEN: string;
    DATADOG_CLIENT_TOKEN: string;
    DATADOG_SITE: string;
  }
}
