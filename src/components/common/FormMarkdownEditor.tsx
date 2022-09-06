import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

import dynamic from 'next/dynamic';
import { FocusEvent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface FormDataStructure {
  text: string;
}

interface FormMarkdownEditorProps {
  name: string;
  onBlur?: (
    data: FormDataStructure,
    event: FocusEvent<HTMLFormElement> | null
  ) => void;
  shouldAutoFocus?: boolean;
}

const FormMarkdownEditor = (props: FormMarkdownEditorProps) => {
  const { name, onBlur, shouldAutoFocus } = props;
  const { control } = useFormContext(); // retrieve all hook methods

  if (global.window?.document) {
    window.document.documentElement.setAttribute('data-color-mode', 'light');
  }

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <MDEditor
              value={value}
              onChange={onChange}
              onBlur={() => {
                onBlur?.({ text: value }, null);
              }}
              autoFocus={shouldAutoFocus}
              preview="preview"
            />
          </>
        )}
      />
    </>
  );
};

export default FormMarkdownEditor;
