import { clsx } from 'clsx';

interface TextDisplayProps {
  value: string;
  textDisplayClassName?: string;
}

const TextDisplay = (props: TextDisplayProps) => {
  return (
    <span
      className={clsx(
        'text-lg font-medium flex flex-row items-center w-full',
        props.textDisplayClassName
      )}
    >
      {props.value}
    </span>
  );
};

export default TextDisplay;