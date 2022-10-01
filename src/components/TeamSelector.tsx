import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import { ListItemButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAppContext } from '@src/components/AppContext';
import { SnackbarSeverity, useSnackbar } from '@src/components/common/Snackbar';
import QueryKeys from '@src/services/QueryKeys';
import UserPreferencesService from '@src/services/UserPreferencesService';

const TeamSelector = () => {
  const appContext = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const snackbar = useSnackbar();

  const mutation = useMutation(
    [QueryKeys.USER_PREFERENCES],
    UserPreferencesService.update,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.USER_PREFERENCES]);
      },
    }
  );

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className={
          'sidebar-element group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full'
        }
        onClick={() => setIsOpen(true)}
      >
        <PeopleIcon
          className={
            'text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6'
          }
          aria-hidden="true"
        />
        Change Team
      </button>
      <Dialog onClose={handleClose} open={isOpen} fullWidth>
        <DialogTitle>Select Team</DialogTitle>
        <List sx={{ pt: 0 }}>
          {appContext.teams.map((team) => (
            <ListItemButton
              onClick={async () => {
                await mutation.mutate([
                  {
                    field: 'teamId',
                    value: team.id,
                  },
                ]);
                setIsOpen(false);
                snackbar.displaySnackbar({
                  message: `Changing team to ${team.name}`,
                  severity: SnackbarSeverity.SUCCESS,
                });
                setTimeout(() => {
                  router.push('/app/dashboard');
                }, 500);
              }}
              key={team.id}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${team.name} ${
                  team.id === appContext.selectedTeam.id ? ' - Selected' : ''
                }`}
              />
            </ListItemButton>
          ))}
          <Link href="/app/team/create">
            <ListItemButton onClick={() => setIsOpen(false)}>
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Create New Team" />
            </ListItemButton>
          </Link>
        </List>
      </Dialog>
    </>
  );
};

export default TeamSelector;
