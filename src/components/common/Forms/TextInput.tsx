import { ChangeEventHandler, useState } from 'react';
import clsx from 'clsx';

interface TextInputProps {
  value: string | null | undefined;
  onChange: (newValue: string) => void;
  label: string;
  id: string;
  required?: boolean;
  error?: boolean;
  helperMessage?: string;
}

const TextInput = (props: TextInputProps) => {
  const [isFocussed, setIsFocussed] = useState(false);

  const isLabelFloating = isFocussed || !!props.value;

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    props.onChange(event.target.value);
  };

  const errorDescriptionId = `${props.id}-error`;

  const inputErrorAccessibilityProperties = {
    'aria-invalid': true,
    'aria-describedby': errorDescriptionId,
  };

  return (
    <div
      className="relative mb-10"
      onFocus={() => setIsFocussed(true)}
      onBlur={() => setIsFocussed(false)}
    >
      <div className="relative h-full">
        <input
          id={props.id}
          type="text"
          className={clsx(
            'w-full h-14 border border-gray-300 text-lg px-4 py-1 rounded-lg focus:outline focus:outline-accent-blue-500',
            {
              'outline !outline-red-500': props.error,
            }
          )}
          value={props.value ?? ''}
          onChange={onChange}
          {...(props.error ? inputErrorAccessibilityProperties : {})}
        />
        {props.helperMessage && (
          <span
            id={errorDescriptionId}
            className="absolute left-2 -bottom-5 text-red-600"
          >
            {props.helperMessage}
          </span>
        )}
      </div>
      <label
        htmlFor={props.id}
        className={clsx(
          'text-base absolute left-2 px-2 top-4 text-slate-400 ease-out duration-75',
          {
            '!-top-2.5 bg-white px-2 !text-sm': isLabelFloating,
            '!text-accent-blue-500': isFocussed,
            '!text-red-600': props.error,
          }
        )}
      >
        {props.label} {props.required && '*'}
      </label>
    </div>
  );
};

export default TextInput;
