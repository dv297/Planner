import { Button } from '@mui/material';

interface FormSubmitButtonProps {
  label: string;
}

const FormSubmitButton = (props: FormSubmitButtonProps) => {
  const { label } = props;

  return (
    <Button type="submit" title={label} variant="contained" fullWidth={false}>
      {label}
    </Button>
  );
};

export default FormSubmitButton;
