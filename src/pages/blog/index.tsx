import imageUrlBuilder from '@sanity/image-url';
import { useRouter } from 'next/router';
import { groq } from 'next-sanity';
import { ReactNode } from 'react';

import LandingPageLayout from '../../components/LandingPageLayout';
import BlogPostListing from '../../components/pages/blog/BlogPostListing';
import { getClient, usePreviewSubscription } from '../../lib/sanity';

const query = groq`
  *[_type == "post"]  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    publishedAt,
    author->{
      name,
      image
    }
  }
`;

const Posts = (props: any) => {
  const { postsData, preview } = props;

  const router = useRouter();

  const { data: posts } = usePreviewSubscription(query, {
    initialData: postsData,
    enabled: preview || router.query.preview !== undefined,
  });

  if (!posts) {
    return null;
  }

  return (
    <div>
      <div className="mt-8">
        <h1 className="mb-4 text-5xl md:text-6xl text-center font-bold font-heading font-heading tracking-px-n leading-tight">
          Latest from Blog
        </h1>
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => {
            return (
              <BlogPostListing post={post} key={post.slug} preview={preview} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface StaticPropsParams {
  slug: string;
}

export async function getStaticProps({
  params,
  preview = false,
}: {
  params: StaticPropsParams;
  preview: boolean;
}) {
  const posts = await getClient(preview).fetch(query);

  return {
    props: {
      postsData: posts,
      preview,
    },
    revalidate: 10,
  };
}

Posts.getLayout = (page: ReactNode) => {
  return <LandingPageLayout>{page}</LandingPageLayout>;
};

export default Posts;
