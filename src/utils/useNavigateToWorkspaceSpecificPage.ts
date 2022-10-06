import { useCallback } from 'react';
import { useRouter } from 'next/router';

import { useAppContext } from '@src/components/AppContext';

const useNavigateToWorkspaceSpecificPage = () => {
  const router = useRouter();
  const appContext = useAppContext();
  const workspaceTag = appContext.selectedWorkspace.tag;

  const navigateToWorkspaceSpecificPage = useCallback(
    (pageUrl: string) => {
      const modifiedUrl = `${pageUrl}/${workspaceTag}`;
      router.push(`/app/${modifiedUrl}`);
    },
    [workspaceTag, router]
  );

  return navigateToWorkspaceSpecificPage;
};

export default useNavigateToWorkspaceSpecificPage;
