import { FocusEvent } from 'react';
import Foco from 'react-foco';
import { Controller, useFormContext } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface FormDataStructure {
  text: string;
}

interface FormMarkdownEditorProps {
  name: string;
  onBlur?: (
    data: FormDataStructure,
    event: FocusEvent<HTMLFormElement | HTMLDivElement> | null
  ) => void;
  shouldAutoFocus?: boolean;
  height?: number;
}

const FormMarkdownEditor = (props: FormMarkdownEditorProps) => {
  const { name, onBlur, shouldAutoFocus, height = 200 } = props;
  const { control } = useFormContext(); // retrieve all hook methods
  const { theme } = useTheme();

  if (global.window?.document && theme) {
    window.document.documentElement.setAttribute('data-color-mode', theme);
  }

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <Foco
              onClickOutside={() => {
                onBlur?.({ text: value }, null);
              }}
            >
              <MDEditor
                height={height}
                value={value}
                onChange={onChange}
                autoFocus={shouldAutoFocus}
              />
            </Foco>
          </>
        )}
      />
    </>
  );
};

export default FormMarkdownEditor;
