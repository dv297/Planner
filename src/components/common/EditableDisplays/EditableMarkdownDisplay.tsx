import { CircularProgress } from '@mui/material';
import clsx from 'clsx';

import MarkdownPreview from '@src/components/common/EditableDisplays/MarkdownPreview';
import useEditableDisplay from '@src/components/common/EditableDisplays/useEditableDisplay';
import Form from '@src/components/common/Form';
import FormMarkdownEditor from '@src/components/common/FormMarkdownEditor';

export interface EditableMarkdownDisplayProps {
  onBlurSubmission: (data: string) => Promise<void>;
  initialValue: string;
  label: string;
  editorHeight?: number;
}

const EditableMarkdownDisplay = (props: EditableMarkdownDisplayProps) => {
  const { onBlurSubmission, initialValue, editorHeight = 200 } = props;
  const {
    textValue,
    handleBlurSubmission,
    isEditing,
    isLoading,
    hasError,
    openEditor,
    containerRef,
  } = useEditableDisplay({
    initialValue,
    onBlurSubmission,
  });

  return (
    <div ref={containerRef}>
      <Form defaultValues={{ text: textValue }}>
        {({ keys }) => (
          <>
            <div
              onClick={openEditor}
              className={clsx(
                'w-full cursor-pointer border-b-2 border-theme-background',
                'hover:border-solid hover:border-accent-blue-300 dark:hover:border-accent-blue-500'
              )}
            >
              {!isEditing ? (
                <div className="pt-2 pb-4">
                  <MarkdownPreview value={textValue} />
                </div>
              ) : (
                <div className="flex flex-row relative">
                  <div className="flex flex-col w-full">
                    <FormMarkdownEditor
                      name={keys.text}
                      onBlur={handleBlurSubmission}
                      shouldAutoFocus
                      height={editorHeight}
                    />
                  </div>
                  {isLoading ? (
                    <div className="absolute right-4 h-full flex items-center">
                      <CircularProgress size={20} />
                    </div>
                  ) : null}
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
