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
            className={clsx(
              'w-full rounded-lg cursor-pointer border-2 border-theme-background hover:border-solid',
              {
                'hover:border-gray-100 hover:dark:border-gray-700': !isEditing,
              }
            )}
          >
            {!isEditing ? (
              <div className="px-4 py-1">
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
                  />
                </div>
                {isLoading ? (
                  <div className="absolute right-4 h-full flex items-center">
                    <CircularProgress size={20} />
                  </div>
                ) : (
                  <div>
                    <button
                      className="absolute right-4 h-full"
                      onClick={handleCancelClick}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                )}
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
