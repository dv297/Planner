import { ReactNode } from 'react';
import MuiButton from '@mui/material/Button';
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';

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
