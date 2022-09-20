import { Dialog } from '@headlessui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

import IssueService from '../services/IssueService';
import { useAppContext } from './AppContext';
import Modal from './common/Modal';
import { SnackbarSeverity, useSnackbar } from './common/Snackbar';
import CreateIssueForm from './CreateIssueForm';

interface IssueCreationModalProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  projectId: string;
  onIssueCreationSuccess?: () => void;
}

const IssueCreationModal = (props: IssueCreationModalProps) => {
  const { isOpen, setIsOpen, projectId, onIssueCreationSuccess } = props;
  const cancelButtonRef = useRef(null);
  const appContext = useAppContext();
  const { displaySnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return (
    <Modal
      initialFocusRef={cancelButtonRef}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="sm:flex sm:items-start">
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Create Task
          </Dialog.Title>
          <div className="mt-2">
            <CreateIssueForm
              onSubmit={async (data) => {
                try {
                  await IssueService.createIssue({
                    workspaceId: appContext.selectedWorkspace.id,
                    projectId,
                    title: data.title,
                    description: data.description,
                  });
                  await queryClient.invalidateQueries(['project']);

                  displaySnackbar({
                    severity: SnackbarSeverity.SUCCESS,
                    message: 'Created task!',
                  });

                  onIssueCreationSuccess?.();
                  setIsOpen(false);
                } catch (err) {
                  console.error(err);

                  displaySnackbar({
                    severity: SnackbarSeverity.ERROR,
                    message: 'Error occurred, please try again.',
                  });
                }
              }}
              onCancel={() => setIsOpen(false)}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default IssueCreationModal;
