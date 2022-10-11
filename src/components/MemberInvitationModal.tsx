import { useRef } from 'react';

import Form from '@src/components/common/Form';
import FormSubmitButton from '@src/components/common/FormSubmitButton';
import FormTextInput from '@src/components/common/FormTextInput';
import LazyModal from '@src/components/common/Modal/LazyModal';
import { SnackbarSeverity, useSnackbar } from '@src/components/common/Snackbar';
import TeamMembersService from '@src/services/TeamMembersService';

interface MemberInvitationModalProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

const MemberInvitationModal = (props: MemberInvitationModalProps) => {
  const { isOpen, setIsOpen } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const snackbarContext = useSnackbar();

  return (
    <LazyModal initialFocusRef={inputRef} isOpen={isOpen} setIsOpen={setIsOpen}>
      <h1 className="font-bold text-lg">Invite others to collaborate</h1>
      <p className="lead-6 mt-2">
        Add their email below and we will send them an invite to work on your
        project.
      </p>
      <Form
        defaultValues={{ email: '' }}
        onSubmit={async (values) => {
          try {
            await TeamMembersService.inviteTeammate({
              email: values.email,
            });
            snackbarContext.displaySnackbar({
              severity: SnackbarSeverity.SUCCESS,
              message: 'Invite sent!',
            });

            setIsOpen(false);
          } catch (err) {
            console.error(err);
            snackbarContext.displaySnackbar({
              severity: SnackbarSeverity.ERROR,
              message: 'Error occurred, please try again later.',
            });
          }
        }}
      >
        {({ keys }) => {
          return (
            <div className="mt-6">
              <div className="flex flex-row">
                <FormTextInput name={keys.email} id="email" label="Email" />
                <div className="ml-4">
                  <FormSubmitButton label="Invite" />
                </div>
              </div>
            </div>
          );
        }}
      </Form>
    </LazyModal>
  );
};

export default MemberInvitationModal;
