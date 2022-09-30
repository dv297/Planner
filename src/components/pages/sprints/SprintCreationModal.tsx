import { useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { useQueryClient } from '@tanstack/react-query';

import { useAppContext } from '@src/components/AppContext';
import FormBuilder from '@src/components/common/FormBuilder';
import Modal from '@src/components/common/Modal';
import { SnackbarSeverity, useSnackbar } from '@src/components/common/Snackbar';
import QueryKeys from '@src/services/QueryKeys';
import SprintsService from '@src/services/SprintsService';

interface SprintCreationModalProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  onSprintCreationSuccess?: () => void;
}

const SprintCreationModal = (props: SprintCreationModalProps) => {
  const { isOpen, setIsOpen, onSprintCreationSuccess } = props;
  const appContext = useAppContext();
  const cancelButtonRef = useRef(null);
  const { displaySnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return (
    <Modal
      initialFocusRef={cancelButtonRef}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="sm:flex sm:items-start">
        <div className="mt-3 text-center sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Create Sprint
          </Dialog.Title>
        </div>
      </div>

      <Dialog.Panel>
        <div className="mt-2 w-full">
          <FormBuilder
            initialData={{
              name: '',
              beginDate: null,
              endDate: null,
            }}
            inputs={[
              {
                name: 'name',
                type: 'text',
                label: 'Name',
                isRequired: true,
              },
              {
                name: 'beginDate',
                type: 'date',
                label: 'Begin Date (Optional)',
              },
              {
                name: 'endDate',
                type: 'date',
                label: 'End Date (Optional)',
              },
            ]}
            onSubmit={async (data) => {
              try {
                await SprintsService.createSprint(
                  appContext.selectedWorkspace.tag,
                  data
                );
                await queryClient.invalidateQueries([QueryKeys.SPRINTS]);

                displaySnackbar({
                  severity: SnackbarSeverity.SUCCESS,
                  message: 'Created sprint!',
                });

                onSprintCreationSuccess?.();
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
      </Dialog.Panel>
    </Modal>
  );
};

export default SprintCreationModal;
