import { ReactNode } from 'react';

import AppDefaultLayout from '../../../components/AppDefaultLayout';
import CreateIssueForm from '../../../components/CreateIssueForm';

const CreateProjectPage = () => {
  return (
    <>
      <h1 className="text-lg font-bold text-slate-800">Create a Project</h1>
      <div className="mt-4">
        <CreateIssueForm
          onSubmit={async (data) => {
            console.log(data);
          }}
        />
      </div>
    </>
  );
};

CreateProjectPage.getLayout = function getLayout(page: ReactNode) {
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default CreateProjectPage;
