import { SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { createClient, createPreviewSubscriptionHook } from 'next-sanity';

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  useCdn: process.env.NODE_ENV === 'production',
  ignoreBrowserTokenWarning: true,
  apiVersion: '2022-09-21',
};

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

let client: SanityClient;
let previewClient: SanityClient;

export const getClient = (usePreview: boolean): SanityClient => {
  if (usePreview) {
    if (!previewClient) {
      previewClient = createClient({
        ...config,
        useCdn: false,
      });
    }

    return previewClient;
  } else {
    if (!client) {
      client = createClient(config);
    }

    return client;
  }
};

export function urlFor(source: string, usePreview: boolean) {
  return imageUrlBuilder(getClient(usePreview)).image(source);
}
