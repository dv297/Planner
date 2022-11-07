import { clsx } from 'clsx';

interface TextDisplayProps {
  value: string | undefined;
  textDisplayClassName?: string;
}

const TextDisplay = (props: TextDisplayProps) => {
  return (
    <span
      className={clsx(
        'text-lg font-medium flex flex-row items-center w-full dark:text-white',
        props.textDisplayClassName
      )}
    >
      {props.value}
    </span>
  );
};

export default TextDisplay;
