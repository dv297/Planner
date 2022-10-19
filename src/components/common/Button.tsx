import { MouseEventHandler, ReactNode } from 'react';
import clsx from 'clsx';

export interface ButtonProps {
  children: ReactNode;
  variant?: 'contained' | 'text';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  icon?: ReactNode;
}

const Button = (props: ButtonProps) => {
  const {
    variant = 'contained',
    children,
    onClick = () => {},
    isDisabled,
    type = 'button',
    icon,
  } = props;

  return (
    <button
      type={type}
      className={clsx(
        'uppercase leading-tight tracking-tight inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm',
        'bg-accent-blue-500 text-white hover:bg-accent-blue-700',
        'focus:ring-2 focus:ring-accent-blue-700 focus:ring-offset-2 focus:outline-none',
        'w-min whitespace-nowrap',
        {
          'opacity-25 hover:bg-accent-blue-500 cursor-not-allowed': isDisabled,
          'bg-transparent text-blue-600 dark:text-accent-blue-300 shadow-none hover:bg-accent-blue-50 dark:hover:bg-slate-800 focus:!ring-sky-200':
            variant === 'text',
          '!pl-1 !pr-4 ': variant === 'text' && !!icon,
        }
      )}
      onClick={onClick}
      disabled={isDisabled}
    >
      {icon && <div className="mr-2">{icon}</div>}
      {children}
    </button>
  );
};

export default Button;
