import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import MuiButton from '@mui/material/Button';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: MuiButtonProps['variant'];
  onClick: () => void;
}

const Button = (props: ButtonProps) => {
  const { variant = 'contained', children, onClick } = props;

  return (
    <MuiButton variant={variant} onClick={onClick}>
      {children}
    </MuiButton>
  );
};

export default Button;
