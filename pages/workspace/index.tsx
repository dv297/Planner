import Layout from '../../components/Layout';
import FormTextInput from '../../components/FormTextInput';
import Form from '../../components/Form';
import FormSubmitButton from '../../components/FormSubmitButton';

const Workspace = () => {
  return (
    <Layout>
      <h1 className="mb-4">Add Workspace</h1>
      <Form
        onSubmit={async (data) => {
          try {
            const body = { name: data.name, tag: data.tag };
            await fetch('/api/workspace', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body),
            });
          } catch (error) {
            console.error(error);
          }
        }}
        defaultValues={{
          name: '',
          tag: '',
        }}
      >
        {({ keys }) => (
          <div className="flex flex-col">
            <div className="mb-8">
              <FormTextInput label="Name" name={keys.name} />
            </div>
            <div className="mb-8">
              <FormTextInput label="Tag" name={keys.tag} />
            </div>
            <FormSubmitButton label="Submit" />
          </div>
        )}
      </Form>
    </Layout>
  );
};

export default Workspace;
