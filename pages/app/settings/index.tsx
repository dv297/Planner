import AppDefaultLayout from '../../../src/components/AppDefaultLayout';

interface SettingsProps {}

const Settings = (props: SettingsProps) => {
  return <h1>Settings</h1>;
};

Settings.getLayout = function getLayout(page) {
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default Settings;
