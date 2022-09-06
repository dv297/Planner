import { CircularProgress } from '@mui/material';
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import Form from './Form';
import FormTextInput from './FormTextInput';

interface EditableTextDisplayDataStructure {
  text: string;
}

interface TextDisplayProps {
  value: string;
}

const TextDisplay = (props: TextDisplayProps) => {
  return (
    <span className="text-lg font-medium flex flex-row items-center w-full">
      {props.value}
    </span>
  );
};

export interface EditableTextDisplayProps {
  onBlurSubmission: () => Promise<void>;
  initialValue: string;
}

const EditableTextDisplay = (props: EditableTextDisplayProps) => {
  const { onBlurSubmission, initialValue } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [textValue, setTextValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const openEditor = useCallback(() => {
    setIsEditing(true);
  }, [setIsEditing]);

  useEffect(() => {
    if (isEditing) {
      inputRef?.current?.focus();
    }
  }, [isEditing]);

  const handleBlurSubmission = useCallback(
    async (formData: EditableTextDisplayDataStructure, event) => {
      if (
        event.relatedTarget === cancelButtonRef.current ||
        event.relatedTarget === inputRef.current
      ) {
        return;
      }

      setIsLoading(true);
      onBlurSubmission?.()
        .then(() => {
          setTextValue(formData.text);
          setIsEditing(false);
        })
        .catch((err) => {
          setHasError(true);
          throw err;
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [onBlurSubmission]
  );

  const handleCancelClick = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setIsEditing(false);
      setHasError(false);
    },
    [setIsEditing]
  );

  return (
    <Form defaultValues={{ text: textValue }} onBlur={handleBlurSubmission}>
      {({ keys }) => (
        <>
          <div onClick={openEditor} className="w-full">
            {!isEditing ? (
              <TextDisplay value={textValue} />
            ) : (
              <div className="flex flex-row relative">
                <div className="flex flex-col w-full">
                  <FormTextInput name={keys.text} inputRef={inputRef} />
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
