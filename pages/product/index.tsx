import { useRouter } from 'next/router';
import LandingPageLayout from '../../src/components/LandingPageLayout';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="text-center">
      <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
        <span className="block">Product</span>
      </h1>
    </div>
  );
}

HomePage.getLayout = (page) => {
  return <LandingPageLayout>{page}</LandingPageLayout>;
};
