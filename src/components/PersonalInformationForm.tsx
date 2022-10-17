import { ReactNode } from 'react';

import Form from '@src/components/common/Form';
import FormImageUploader from '@src/components/common/FormImageUploader';
import FormSubmitButton from '@src/components/common/FormSubmitButton';
import FormTextInput from '@src/components/common/FormTextInput';

interface FormRowProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
}

const FormRow = (props: FormRowProps) => {
  const { label, htmlFor, children } = props;

  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium sm:mt-px sm:pt-2"
      >
        {label}
      </label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">{children}</div>
    </div>
  );
};

export interface PersonalInformationFormData {
  name: string;
  email: string;
  image: string;
}

interface PersonalInformationFormProps {
  initialData: PersonalInformationFormData;
  onSubmit: (data: PersonalInformationFormData) => void;
}

const PersonalInformationForm = (props: PersonalInformationFormProps) => {
  const { initialData, onSubmit } = props;

  return (
    <>
      <Form
        defaultValues={{
          name: initialData.name,
          email: initialData.email,
          image: initialData.image,
        }}
        onSubmit={onSubmit}
      >
        {({ keys }) => (
          <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
            <div>
              <h3 className="text-lg leading-6 font-medium">
                Personal Information
              </h3>
            </div>
            <div className="space-y-6 sm:space-y-5">
              <FormTextInput name={keys.name} id="name" label="Name" />
              <FormTextInput name={keys.email} id="email" label="Email" />
              <FormRow label="Image" htmlFor="image">
                <FormImageUploader name={keys.image} id="image" />
              </FormRow>
            </div>
            <FormSubmitButton label="Submit" />
          </div>
        )}
      </Form>
    </>
  );
};

export default PersonalInformationForm;
