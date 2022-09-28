import { Avatar } from '@material-ui/core';
import md5 from 'md5';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export interface AvatarUser {
  name: string;
  id: string;
  image: string;
  email: string;
}

interface AssigneeAvatarProps {
  user: AvatarUser;
}

const UserAvatar = (props: AssigneeAvatarProps) => {
  const { user } = props;
  const address = String(user.email).trim().toLowerCase();

  const hash = md5(address);

  return (
    <div className="mr-4" title={user.name}>
      <Avatar
        src={`https://www.gravatar.com/avatar/${hash}?d=404`}
        {...stringAvatar(user.name)}
      />
    </div>
  );
};

export default UserAvatar;
