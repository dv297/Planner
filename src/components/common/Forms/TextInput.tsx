import {
  ChangeEventHandler,
  FocusEventHandler,
  ReactNode,
  Ref,
  useState,
} from 'react';
import clsx from 'clsx';

interface TextInputProps {
  value: string | null | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  label: string;
  id: string;
  name: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  inputRef?: Ref<any | undefined>;
  endAdornment?: ReactNode;
}

const TextInput = (props: TextInputProps) => {
  const [isFocussed, setIsFocussed] = useState(false);

  const isLabelFloating = isFocussed || !!props.value;

  const errorDescriptionId = `${props.id}-error`;

  const inputErrorAccessibilityProperties = {
    'aria-invalid': true,
    'aria-describedby': errorDescriptionId,
  };

  return (
    <div
      className="relative mt-5 mb-3"
      onFocus={() => setIsFocussed(true)}
      onBlur={() => setIsFocussed(false)}
    >
      <div className="relative h-full">
        <label
          htmlFor={props.id}
          className={clsx(
            'text-base absolute left-2 px-2 my-auto top-0 bottom-0 text-gray-400 ease-out duration-75 flex items-center',
            {
              '-top-14 px-2 !my-0 !text-xs': isLabelFloating,
              'text-accent-blue-500 dark:text-accent-blue-300': isFocussed,
              '!text-red-600': props.error,
            }
          )}
        >
          {props.label} {props.required && '(Required)'}
        </label>
        <div className="relative">
          <input
            id={props.id}
            type="text"
            className={clsx(
              'w-full bg-transparent h-10 border border-gray-300 dark:border-gray-700 text-lg pl-4 py-1 rounded-lg',
              'focus:outline focus:outline-accent-blue-500 dark:outline-accent-blue-300',
              {
                'outline !outline-red-500': props.error,
                'pr-20': !!props.endAdornment,
              }
            )}
            value={props.value ?? ''}
            onChange={props.onChange}
            onBlur={props.onBlur}
            ref={props.inputRef}
            name={props.name}
            {...(props.error ? inputErrorAccessibilityProperties : {})}
          />
          {props.endAdornment && (
            <div className="absolute h-full top-0 bottom-0 my-auto right-4 flex items-center">
              {props.endAdornment}
            </div>
          )}
        </div>
        {props.helperText && (
          <span
            id={errorDescriptionId}
            className="absolute left-4 -bottom-6 text-red-600"
          >
            {props.helperText}
          </span>
        )}
      </div>
    </div>
  );
};

export default TextInput;
