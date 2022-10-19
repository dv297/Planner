import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { groq } from 'next-sanity';

import LandingPageLayout from '@src/components/LandingPageLayout';
import BlogPostListing from '@src/components/pages/blog/BlogPostListing';
import { getClient, usePreviewSubscription } from '@src/lib/sanity';

const query = groq`
  *[_type == "post"]  | order(publishedAt desc) {
    _id,
    title,
    description,
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
    <div className="px-8">
      <motion.div
        className="mt-8"
        style={{ x: -10 }}
        initial={{ opacity: 0.1 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="mb-4 text-4xl md:text-6xl text-center font-bold font-heading font-heading tracking-px-n leading-tight">
          The Latest from{' '}
          <span className="text-primary block text-5xl md:text-7xl">
            Planner
          </span>
        </h1>
        <p className="mt-2 tracking-px-n leading-tight text-center w-full text-xl">
          We are always learning and exploring new ideas. We try to share our
          experiences through these blogs, and{' '}
          <Link href="https://twitter.com/thedanielvu">
            <span className="text-primary underline cursor-pointer">
              we would love to hear from you!
            </span>
          </Link>
        </p>
      </motion.div>
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {posts.map((post: any) => {
            return (
              <BlogPostListing post={post} key={post.slug} preview={preview} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({
  preview = false,
}: {
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
