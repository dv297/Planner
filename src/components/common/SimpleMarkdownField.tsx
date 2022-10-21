import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import dynamic from 'next/dynamic';

const FormMarkdownEditor = dynamic(
  () => import('@src/components/common/FormMarkdownEditor')
);

export interface SimpleMarkdownFieldProps {
  name: string;
  id: string;
}

const SimpleMarkdownField = (props: SimpleMarkdownFieldProps) => {
  const { name, id } = props;
  const [isAdvancedEditorOpen, setIsAdvancedEditorOpen] = useState(false);
  const { control } = useFormContext();

  let inputElement = (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <textarea
            rows={4}
            className={clsx(
              'w-full h-[100px] bg-transparent border border-gray-300 dark:border-gray-700 text-lg pl-4 py-1 rounded-lg focus:outline-accent-blue-500'
            )}
            value={value}
            onChange={onChange}
            id={id}
          />
        );
      }}
    />
  );

  if (isAdvancedEditorOpen) {
    inputElement = <FormMarkdownEditor name={name} height={100} />;
  }

  return (
    <div>
      <div className="w-full flex items-center">
        <span className="text-xs flex-1 text-slate-600 dark:text-gray-300">
          Supports Markdown
        </span>
        <button
          className="text-sm mb-2 underline"
          onClick={() => setIsAdvancedEditorOpen((value) => !value)}
        >
          Switch to {isAdvancedEditorOpen ? 'simple' : 'full'} editor
        </button>
      </div>
      <div className="h-28">{inputElement}</div>
    </div>
  );
};

export default SimpleMarkdownField;
