import AddIcon from '@mui/icons-material/Add';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import RefreshIcon from '@mui/icons-material/Refresh';
import { toPng } from 'html-to-image';
import { useState } from 'react';

import IssueCreationModal from '../IssueCreationModal';
import { useProjectMapContext } from './ProjectMapContext';

function downloadImage(dataUrl: string) {
  const a = document.createElement('a');

  a.setAttribute('download', 'reactflow.png');
  a.setAttribute('href', dataUrl);
  a.click();
}

const ProjectMapControls = () => {
  const projectMapContext = useProjectMapContext();

  const [isIssueCreationModalOpen, setIsIssueCreationModalOpen] =
    useState(false);

  return (
    <div className="project-map-controls">
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-gray-200 px-2 py-2 rounded-lg border border-solid border-gray-300 shadow-md divide-x-2 divide-solid divide-stone-300">
          <button
            onClick={projectMapContext.refresh}
            className="py-1 px-2"
            title="Refresh map"
          >
            <RefreshIcon />
          </button>
          <button
            onClick={() => setIsIssueCreationModalOpen(true)}
            className="py-1 px-2"
            title="Create issue"
          >
            <AddIcon />
          </button>
          <button
            onClick={() => {
              const reactFlowElement = document.querySelector(
                '.react-flow'
              ) as HTMLElement;
              if (reactFlowElement) {
                toPng(reactFlowElement, {
                  filter: (node) => {
                    // we don't want to add the minimap and the controls to the image
                    if (
                      node?.classList?.contains('react-flow__minimap') ||
                      node?.classList?.contains('react-flow__controls') ||
                      node?.classList?.contains('project-map-controls')
                    ) {
                      return false;
                    }

                    return true;
                  },
                }).then(downloadImage);
              }
            }}
            className="py-1 px-2"
            title="Save as image"
          >
            <PhotoCameraIcon />
          </button>
        </div>
      </div>
      <IssueCreationModal
        isOpen={isIssueCreationModalOpen}
        setIsOpen={setIsIssueCreationModalOpen}
        projectId={projectMapContext.projectId}
        onIssueCreationSuccess={projectMapContext.refresh}
      />
    </div>
  );
};

export default ProjectMapControls;
