import Button from '@src/components/common/Button';

interface FormSubmitButtonProps {
  label: string;
  isDisabled?: boolean;
}

const FormSubmitButton = (props: FormSubmitButtonProps) => {
  const { label, isDisabled } = props;

  return (
    <Button type="submit" variant="contained" isDisabled={isDisabled}>
      {label}
    </Button>
  );
};

export default FormSubmitButton;
