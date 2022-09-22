import { ReactNode } from 'react';

import LandingPageLayout from '../../components/LandingPageLayout';

interface BlogProps {}

const Blog = (props: BlogProps) => {
  return <h1>Blog</h1>;
};

Blog.getLayout = (page: ReactNode) => {
  return <LandingPageLayout>{page}</LandingPageLayout>;
};

export default Blog;
