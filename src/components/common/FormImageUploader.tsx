import { ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Resizer from 'react-image-file-resizer';
import { useS3Upload } from 'next-s3-upload';

import Button from '@src/components/common/Button';

interface FormImageUploaderProps {
  name: string;
  id: string;
  placeholder?: ReactNode;
}

const FormImageUploader = (props: FormImageUploaderProps) => {
  const { name, id, placeholder } = props;

  const { control } = useFormContext();
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  return (
    <div>
      <>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <>
                <FileInput
                  onChange={async (file: File) => {
                    Resizer.imageFileResizer(
                      file,
                      300,
                      300,
                      'jpeg',
                      75,
                      0,
                      async (uri) => {
                        const uriFile = uri as File;
                        const { url } = await uploadToS3(uriFile);
                        onChange(url);
                      },
                      'file'
                    );
                  }}
                  id={id}
                />
                {value ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={value}
                    alt="Uploaded image"
                    className="max-h-32 max-w-32 rounded-full mb-4"
                  />
                ) : (
                  placeholder
                )}
                <Button variant="text" onClick={openFileDialog}>
                  Upload file
                </Button>
              </>
            );
          }}
        />
      </>
    </div>
  );
};

export default FormImageUploader;
