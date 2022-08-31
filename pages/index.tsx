import { ReactNode } from 'react';
import LandingPageLayout from '../src/components/LandingPageLayout';

export default function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
        <span className="block">Home</span>
      </h1>
    </div>
  );
}

HomePage.getLayout = (page: ReactNode) => {
  return <LandingPageLayout>{page}</LandingPageLayout>;
};
