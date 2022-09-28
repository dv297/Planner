import { ReactNode } from 'react';

import Form from './common/Form';
import FormImageUploader from './common/FormImageUploader';
import FormSubmitButton from './common/FormSubmitButton';
import FormTextInput from './common/FormTextInput';

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
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
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
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Personal Information
              </h3>
            </div>
            <div className="space-y-6 sm:space-y-5">
              <FormRow label="Name" htmlFor="name">
                <FormTextInput name={keys.name} id="name" className="w-80" />
              </FormRow>

              <FormRow label="Email" htmlFor="email">
                <FormTextInput name={keys.email} id="email" className="w-80" />
              </FormRow>
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
