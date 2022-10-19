import { CircularProgress } from '@mui/material';
import clsx from 'clsx';

import TextDisplay from '@src/components/common/EditableDisplays/TextDisplay';
import useEditableDisplay from '@src/components/common/EditableDisplays/useEditableDisplay';
import Form from '@src/components/common/Form';
import FormTextInput from '@src/components/common/FormTextInput';

export interface EditableTextDisplayProps {
  id: string;
  label: string;
  onBlurSubmission: (data: string) => Promise<void>;
  initialValue: string;
  textDisplayClassName?: string;
}

const EditableTextDisplay = (props: EditableTextDisplayProps) => {
  const { onBlurSubmission, initialValue, textDisplayClassName, label, id } =
    props;
  const {
    textValue,
    handleBlurSubmission,
    isEditing,
    isLoading,
    hasError,
    openEditor,
    handleCancelClick,
    inputRef,
    cancelButtonRef,
  } = useEditableDisplay({
    initialValue,
    onBlurSubmission,
  });

  return (
    <Form defaultValues={{ text: textValue }} onBlur={handleBlurSubmission}>
      {({ keys }) => (
        <>
          <div
            onClick={openEditor}
            className={clsx('w-full cursor-pointer', {
              'hover:border-b-2 hover:border-accent-blue-300 hover:dark:border-accent-blue-500':
                !isEditing,
            })}
          >
            {!isEditing ? (
              <div className="py-3">
                <TextDisplay
                  value={textValue}
                  textDisplayClassName={textDisplayClassName}
                />
              </div>
            ) : (
              <div className="flex flex-row relative">
                <div className="flex flex-col w-full">
                  <FormTextInput
                    name={keys.text}
                    inputRef={inputRef}
                    label={label}
                    id={id}
                    endAdornment={
                      isLoading ? (
                        <CircularProgress size={20} />
                      ) : (
                        <button
                          onClick={handleCancelClick}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      )
                    }
                  />
                </div>
              </div>
            )}
          </div>
          {hasError && (
            <div className="text-red-600 leading-6 font-small mt-1">
              There was an error saving your change. Make a change and try
              again.
            </div>
          )}
        </>
      )}
    </Form>
  );
};

export default EditableTextDisplay;
