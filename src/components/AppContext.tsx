import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { createContext, ReactNode, useContext } from 'react';
import { z } from 'zod';

import { UserPreferencesSchema } from '../schemas/UserPreferencesSchemas';
import {
  GetWorkspacesResponseDataSchema,
  WorkspaceSchema,
} from '../schemas/WorkspaceSchemas';
import QueryKeys from '../services/QueryKeys';
import UserPreferencesService from '../services/UserPreferencesService';
import WorkspaceService from '../services/WorkspaceService';
import FullScreenLoader from './common/FullScreenLoader';

interface AppContextProps {
  children: ReactNode;
}

interface AppContextStructure {
  workspaces: z.infer<typeof GetWorkspacesResponseDataSchema>;
  userPreferences: z.infer<typeof UserPreferencesSchema>;
  selectedWorkspace: z.infer<typeof WorkspaceSchema>;
}

const AppContext = createContext({} as AppContextStructure);

const AppContextProvider = (props: AppContextProps) => {
  const router = useRouter();
  useSession({
    required: true,
    onUnauthenticated: () => {
      router.replace('/');
    },
  });

  const { data: workspaces, isLoading: isLoadingWorkspaces } = useQuery(
    [QueryKeys.WORKSPACES],
    WorkspaceService.getWorkspaces,
    {
      refetchOnWindowFocus: false,
      onError: () => {
        router.replace('/');
      },
    }
  );

  const { data: userPreferences, isLoading: isLoadingUserPreferences } =
    useQuery([QueryKeys.USER_PREFERENCES], UserPreferencesService.get, {
      refetchOnWindowFocus: false,
    });

  const isLoading = isLoadingWorkspaces || isLoadingUserPreferences;
  const hasAllData = !!workspaces && !!userPreferences;

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (!hasAllData) {
    return null;
  }

  const selectedWorkspace =
    workspaces.find((entry) => entry.id === userPreferences.workspaceId) ??
    workspaces[0];

  return (
    <AppContext.Provider
      value={{
        workspaces,
        userPreferences,
        selectedWorkspace,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);

  return context;
};

export { AppContextProvider, useAppContext };
