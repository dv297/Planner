import Button from '@src/components/common/Button';

interface FormSubmitButtonProps {
  label: string;
}

const FormSubmitButton = (props: FormSubmitButtonProps) => {
  const { label } = props;

  return (
    <Button type="submit" variant="contained">
      {label}
    </Button>
  );
};

export default FormSubmitButton;
