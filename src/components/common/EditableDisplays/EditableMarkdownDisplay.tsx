import { CircularProgress } from '@mui/material';
import { SyntheticEvent } from 'react';

import Form from '../Form';
import FormMarkdownEditor from '../FormMarkdownEditor';
import FormTextInput from '../FormTextInput';
import TextDisplay from './TextDisplay';
import useEditableDisplay from './useEditableDisplay';

export interface EditableMarkdownDisplayProps {
  onBlurSubmission: (data: string) => Promise<void>;
  initialValue: string;
  textDisplayClassName?: string;
}

const EditableMarkdownDisplay = (props: EditableMarkdownDisplayProps) => {
  const { onBlurSubmission, initialValue, textDisplayClassName } = props;
  const {
    textValue,
    handleBlurSubmission,
    isEditing,
    isLoading,
    hasError,
    openEditor,
    handleCancelClick,
    cancelButtonRef,
    containerRef,
  } = useEditableDisplay({
    initialValue,
    onBlurSubmission,
  });

  return (
    <div ref={containerRef}>
      <Form defaultValues={{ text: textValue }} onBlur={handleBlurSubmission}>
        {({ keys }) => (
          <>
            <div
              onClick={openEditor}
              className="w-full rounded-lg cursor-pointer border-2 border-white hover:border-solid hover:border-gray-100"
            >
              {!isEditing ? (
                <TextDisplay
                  value={textValue}
                  textDisplayClassName={textDisplayClassName}
                />
              ) : (
                <div className="flex flex-row relative">
                  <div className="flex flex-col w-full">
                    <FormMarkdownEditor
                      name={keys.text}
                      onBlur={handleBlurSubmission}
                      shouldAutoFocus
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
    </div>
  );
};

export default EditableMarkdownDisplay;
