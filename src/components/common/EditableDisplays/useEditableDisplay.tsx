import {
  FocusEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface EditableTextDisplayDataStructure {
  text: string;
}

interface UseEditableDisplayInput {
  initialValue: string | undefined;
  onBlurSubmission: (data: string) => Promise<void>;
}

const useEditableDisplay = (input: UseEditableDisplayInput) => {
  const { initialValue, onBlurSubmission } = input;

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [textValue, setTextValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const openEditor = useCallback(() => {
    setIsEditing(true);
  }, [setIsEditing]);

  useEffect(() => {
    if (isEditing) {
      inputRef?.current?.focus();
    }
  }, [isEditing]);

  const handleBlurSubmission = useCallback(
    async (
      formData: EditableTextDisplayDataStructure,
      event: FocusEvent<HTMLFormElement | HTMLDivElement> | null
    ) => {
      if (
        event?.relatedTarget &&
        (event.relatedTarget === cancelButtonRef.current ||
          event.relatedTarget === inputRef.current)
      ) {
        return;
      }

      setIsLoading(true);
      onBlurSubmission?.(formData.text)
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

  return {
    textValue,
    handleBlurSubmission,
    isEditing,
    isLoading,
    hasError,
    openEditor,
    handleCancelClick,
    inputRef,
    cancelButtonRef,
    containerRef,
  };
};

export default useEditableDisplay;
