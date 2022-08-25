import { Button } from '@mui/material';

interface FormSubmitButtonProps {
  label: string;
}

const FormSubmitButton = (props: FormSubmitButtonProps) => {
  const { label } = props;

  return (
    <Button type="submit" title={label}>
      {label}
    </Button>
  );
};

export default FormSubmitButton;
