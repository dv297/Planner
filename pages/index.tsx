import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import LandingPageLayout from '../src/components/LandingPageLayout';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="text-center">
      <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
        <span className="block">Home</span>
      </h1>
    </div>
  );
}

HomePage.getLayout = (page) => {
  return <LandingPageLayout>{page}</LandingPageLayout>;
};
