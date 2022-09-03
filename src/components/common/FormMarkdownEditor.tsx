import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

import dynamic from 'next/dynamic';
import { Controller, useFormContext } from 'react-hook-form';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface FormMarkdownEditorProps {
  name: string;
}

const FormMarkdownEditor = (props: FormMarkdownEditorProps) => {
  const { name } = props;
  const { control } = useFormContext(); // retrieve all hook methods

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <MDEditor value={value} onChange={onChange} />
          </>
        )}
      />
    </>
  );
};

export default FormMarkdownEditor;
