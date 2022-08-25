import Layout from '../../components/Layout';
import FormTextInput from '../../components/FormTextInput';
import Form from '../../components/Form';
import FormSubmitButton from '../../components/FormSubmitButton';

const Workspace = () => {
  return (
    <Layout>
      <h1 className="mb-4">Add Workspace</h1>
      <Form
        onSubmit={(data) => {
          console.log(data);
        }}
        defaultValues={{
          name: '',
          tag: '',
        }}
      >
        {({ keys }) => (
          <div className="flex flex-col">
            <FormTextInput
              label="Name"
              name={keys.name}
              textFieldProps={{
                size: 'small',
              }}
              className="mb-8"
            />
            <FormTextInput label="Tag" name={keys.tag} />
            <FormSubmitButton />
          </div>
        )}
      </Form>
    </Layout>
  );
};

export default Workspace;
