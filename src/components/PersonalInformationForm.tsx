import { ReactNode } from 'react';
import { Avatar } from '@mui/material';

import Form from '@src/components/common/Form';
import FormImageUploader from '@src/components/common/FormImageUploader';
import FormSubmitButton from '@src/components/common/FormSubmitButton';
import FormTextInput from '@src/components/common/FormTextInput';
import { stringAvatar } from '@src/components/common/UserAvatar';

interface FormRowProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
}

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
          image: '',
        }}
        onSubmit={onSubmit}
      >
        {({ keys }) => (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 pt-8 space-y-6 sm:pt-10 space-x-8">
              <div>
                <div>
                  <h3 className="text-lg leading-6 font-medium">
                    Personal Information
                  </h3>
                </div>
                <FormTextInput name={keys.name} id="name" label="Name" />
                <FormTextInput name={keys.email} id="email" label="Email" />
              </div>
              <div className="flex items-center justify-center">
                <FormImageUploader
                  name={keys.image}
                  id="image"
                  placeholder={
                    <div className="w-full h-full flex justify-center items-center mb-2">
                      <Avatar
                        {...stringAvatar(initialData.name)}
                        sx={{ width: 56, height: 56 }}
                      />
                    </div>
                  }
                />
              </div>
            </div>
            <FormSubmitButton label="Submit" />
          </div>
        )}
      </Form>
    </>
  );
};

export default PersonalInformationForm;
