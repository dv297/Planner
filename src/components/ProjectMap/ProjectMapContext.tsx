import { createContext, ReactNode, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { z } from 'zod';

import { GetSingleProjectMapEdgesSetResponseDataSchema } from '@src/schemas/ProjectMapEdgesSetSchemas';
import { GetSingleProjectMapPositionResponseDataSchema } from '@src/schemas/ProjectMapPositionSchemas';
import ProjectMapEdgesSetService from '@src/services/ProjectMapEdgesSetService';
import ProjectMapPositionService from '@src/services/ProjectMapPositionService';
import QueryKeys from '@src/services/QueryKeys';

interface ProjectMapContextType {
  refresh: () => void;
  project:
    | z.infer<typeof GetSingleProjectMapPositionResponseDataSchema>
    | undefined;
  edgeSet:
    | z.infer<typeof GetSingleProjectMapEdgesSetResponseDataSchema>
    | undefined;
  isLoading: boolean;
  projectId: string;
}

const ProjectMapContext = createContext<ProjectMapContextType>({
  refresh: () => {},
  project: undefined,
  edgeSet: undefined,
  isLoading: false,
  projectId: '',
});

interface ProjectMapContextProps {
  children: ReactNode;
}

const ProjectMapContextProvider = (props: ProjectMapContextProps) => {
  const { children } = props;

  const router = useRouter();

  const { issueTag } = router.query;

  const tag = Array.isArray(issueTag) ? issueTag[0] : issueTag;
  const [key, setKey] = useState(0);

  const {
    data: project,
    isLoading: isLoadingPositions,
    refetch: refetchPositions,
  } = useQuery(
    [QueryKeys.PROJECT],
    () => ProjectMapPositionService.getProjectMapPosition(tag),
    {
      enabled: !!tag,
    }
  );

  const {
    data: edgeSet,
    isLoading: isLoadingEdgeSet,
    refetch: refetchEdges,
  } = useQuery(
    [QueryKeys.EDGE_SET],
    () => ProjectMapEdgesSetService.getProjectMapEdgesSet(tag),
    {
      enabled: !!tag,
    }
  );

  const isLoading = isLoadingEdgeSet || isLoadingPositions;

  const refresh = () => {
    Promise.all([refetchPositions(), refetchEdges()]).then(() => {
      setKey((key) => key + 1);
    });
  };

  return (
    <ProjectMapContext.Provider
      value={{
        refresh,
        project,
        edgeSet,
        isLoading,
        projectId: edgeSet?.edges.projectId ?? '',
      }}
    >
      <div key={key} className="h-full w-full">
        {children}
      </div>
    </ProjectMapContext.Provider>
  );
};

const useProjectMapContext = () => {
  const projectMapContext = useContext(ProjectMapContext);

  return projectMapContext;
};

export { ProjectMapContextProvider, useProjectMapContext };
