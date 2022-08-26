import AppDefaultLayout from '../../../src/components/AppDefaultLayout';

const Page = () => {
  return <h1>Team</h1>;
};

Page.getLayout = function getLayout(page) {
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default Page;
