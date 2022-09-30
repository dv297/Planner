import { Controller, useFormContext } from 'react-hook-form';
import Resizer from 'react-image-file-resizer';
import { useS3Upload } from 'next-s3-upload';

import Button from '@src/components/common/Button';

interface FormImageUploaderProps {
  name: string;
  id: string;
}

const FormImageUploader = (props: FormImageUploaderProps) => {
  const { name, id } = props;

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
                        console.log(uriFile);
                        const { url } = await uploadToS3(uriFile);
                        onChange(url);
                      },
                      'file'
                    );
                  }}
                  id={id}
                />
                <Button variant="text" onClick={openFileDialog}>
                  Upload file
                </Button>
                {value && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={value}
                    alt="Uploaded image"
                    className="max-h-32 max-w-32"
                  />
                )}
              </>
            );
          }}
        />
      </>
    </div>
  );
};

export default FormImageUploader;
