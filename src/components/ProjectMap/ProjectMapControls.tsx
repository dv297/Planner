import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useState } from 'react';

import { useAppContext } from '../AppContext';
import IssueCreationModal from '../IssueCreationModal';
import { useProjectMapContext } from './ProjectMapContext';

const ProjectMapControls = () => {
  const projectMapContext = useProjectMapContext();

  const [isIssueCreationModalOpen, setIsIssueCreationModalOpen] =
    useState(false);

  return (
    <>
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-gray-200 px-2 py-2 rounded-lg border border-solid border-gray-300 shadow-md divide-x-2 divide-solid divide-stone-300">
          <button onClick={projectMapContext.refresh} className="py-1 px-2">
            <RefreshIcon />
          </button>
          <button
            onClick={() => setIsIssueCreationModalOpen(true)}
            className="py-1 px-2"
          >
            <AddIcon />
          </button>
        </div>
      </div>
      <IssueCreationModal
        isOpen={isIssueCreationModalOpen}
        setIsOpen={setIsIssueCreationModalOpen}
        projectId={projectMapContext.projectId}
        onIssueCreationSuccess={projectMapContext.refresh}
      />
    </>
  );
};

export default ProjectMapControls;
