import Image from 'next/image';

import { urlFor } from '@src/lib//sanity';

export interface Author {
  name: string;
  image: any;
}

export interface Post {
  slug: string;
  mainImage: any;
  title: string;
  description: string;
  author: Author;
  publishedAt: string;
}

interface BlogPostListingProps {
  post: Post;
  preview: boolean;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const BlogPostListing = (props: BlogPostListingProps) => {
  const { post, preview } = props;

  return (
    <div
      key={post.title}
      className="flex flex-col overflow-hidden rounded-lg shadow-lg"
    >
      <div className="flex-shrink-0">
        <a href={`/blog/${post.slug}`} className="mt-2 block">
          <Image
            className="w-full object-cover"
            src={urlFor(post.mainImage, preview).url()}
            alt="Blog Image"
            height="300px"
            width="512px"
            objectFit="fill"
            quality={50}
          />
        </a>
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <a href={`/blog/${post.slug}`} className="mt-2 block">
            <p className="text-xl font-semibold text-gray-900">{post.title}</p>
            <p className="mt-3 text-base text-gray-500">{post.description}</p>
          </a>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <span className="sr-only">{post.author.name}</span>
            <Image
              className="rounded-full"
              src={urlFor(post.author.image, preview).url()}
              alt="Author"
              height="40px"
              width="40px"
              quality={50}
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {post.author.name}
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostListing;
