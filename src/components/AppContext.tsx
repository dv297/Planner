import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode, useContext } from 'react';
import { z } from 'zod';

import { GetWorkspacesResponseDataSchema } from '../schemas/WorkspaceSchemas';
import WorkspaceService from '../services/WorkspaceService';
import FullScreenLoader from './FullScreenLoader';

interface AppContextProps {
  children: ReactNode;
}

interface AppContextStructure {
  workspaces: z.infer<typeof GetWorkspacesResponseDataSchema>;
}

const AppContext = createContext({} as AppContextStructure);

const AppContextProvider = (props: AppContextProps) => {
  const {
    data: workspaces,
    isLoading,
    error,
  } = useQuery(['workspaces'], WorkspaceService.getWorkspaces, {
    refetchOnWindowFocus: false,
  });

  console.log(error);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (!workspaces) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        workspaces,
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
