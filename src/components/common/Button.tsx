import { ReactNode } from 'react';
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import MuiButton from '@mui/material/Button';

interface ButtonProps {
  children: ReactNode;
  variant?: MuiButtonProps['variant'];
  onClick: MuiButtonProps['onClick'];
  isDisabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const { variant = 'contained', children, onClick, isDisabled } = props;

  return (
    <MuiButton variant={variant} onClick={onClick} disabled={isDisabled}>
      {children}
    </MuiButton>
  );
};

export default Button;
