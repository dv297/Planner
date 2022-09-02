import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { AppContextProvider, useAppContext } from './AppContext';

const Redirecter = ({ url }: { url: string }) => {
  const { selectedWorkspace } = useAppContext();
  const router = useRouter();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (selectedWorkspace) {
      router.replace(url.replace('{WORKSPACE_TAG}', selectedWorkspace.tag));
    }
  }, [selectedWorkspace, url, router]);

  return <>Loading</>;
};

const PageRedirectToSlug = ({ url }: { url: string }) => {
  return (
    <AppContextProvider>
      <Redirecter url={url} />
    </AppContextProvider>
  );
};

export default PageRedirectToSlug;
