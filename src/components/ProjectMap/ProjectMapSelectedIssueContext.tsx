import { createContext, ReactNode, useContext, useState } from 'react';

interface ProjectMapSelectedIssueContextType {
  selectedIssueId: string | undefined;
  setSelectedIssueId: (id: string) => void;
}

const ProjectMapSelectedIssueContext =
  createContext<ProjectMapSelectedIssueContextType>({
    selectedIssueId: undefined,
    setSelectedIssueId: () => {},
  });

interface ProjectMapSelectedIssueContextProps {
  children: ReactNode;
}

const ProjectMapSelectedIssueContextProvider = (
  props: ProjectMapSelectedIssueContextProps
) => {
  const { children } = props;
  const [selectedIssueId, updateSelectedIssueId] = useState<string | undefined>(
    undefined
  );

  const setSelectedIssueId = (id: string) => {
    updateSelectedIssueId(id);
  };

  return (
    <ProjectMapSelectedIssueContext.Provider
      value={{
        selectedIssueId,
        setSelectedIssueId,
      }}
    >
      {children}
    </ProjectMapSelectedIssueContext.Provider>
  );
};

const useProjectMapSelectedIssueContext = () => {
  const projectMapSelectedIssueContext = useContext(
    ProjectMapSelectedIssueContext
  );

  return projectMapSelectedIssueContext;
};

export {
  ProjectMapSelectedIssueContextProvider,
  useProjectMapSelectedIssueContext,
};
