import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import clsx from 'clsx';

interface AlertProps {
  message: string;
}

const Alert = (props: AlertProps) => {
  const { message } = props;
  return (
    <div
      className={clsx(
        'py-4 rounded-lg mb-2 flex flex-row items-center text-lg',
        'bg-blue-100 text-blue-500 dark:bg-cyan-900 dark:text-blue-300'
      )}
    >
      <div className="w-12 px-6 flex items-center justify-center">
        <InfoOutlinedIcon />
      </div>
      <p className="leading-6 pr-4">{message}</p>
    </div>
  );
};

export default Alert;
