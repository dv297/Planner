import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { AppContextProvider, useAppContext } from '@src/components/AppContext';
import FullScreenLoader from '@src/components/common/FullScreenLoader';

const Redirecter = ({ url }: { url: string }) => {
  const { selectedWorkspace } = useAppContext();
  const router = useRouter();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (selectedWorkspace) {
      router.replace(url.replace('{WORKSPACE_TAG}', selectedWorkspace.tag));
    }
  }, [selectedWorkspace, url, router]);

  return <FullScreenLoader />;
};

const PageRedirectToSlug = ({ url }: { url: string }) => {
  return (
    <AppContextProvider>
      <Redirecter url={url} />
    </AppContextProvider>
  );
};

export default PageRedirectToSlug;
