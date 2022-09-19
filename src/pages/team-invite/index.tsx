import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

import Button from '../../components/common/Button';
import TeamSettingsRepo from '../../repos/TeamSettingsRepo';

interface TeamInviteProps {
  isSuccess: boolean;
}

const TeamInvitePage = (props: TeamInviteProps) => {
  const { isSuccess } = props;

  if (!isSuccess) {
    return (
      <h1>Something went wrong. Please ask your team to send another invite</h1>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-16 border-b border-gray-200 bg-white">
        <div className="flex flex-row items-center h-full pl-12">
          <h1>Planner</h1>
        </div>
      </div>
      <main className="flex flex-col bg-gray-100 flex h-full items-center justify-center flex-1">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          Invite Accepted!
        </h1>
        <div className="mt-4 text-center">
          <p>Click the link below to log in and get started!</p>
          <div className="mt-6">
            <Button
              onClick={async () => {
                await signIn(undefined, {
                  callbackUrl: '/app/dashboard',
                });
              }}
            >
              Log in
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const idToUse = Array.isArray(query.inviteToken)
    ? query.inviteToken[0]
    : query.inviteToken;

  if (!idToUse) {
    return {
      props: {
        inviteToken: null,
      },
    };
  }

  try {
    const updateCount = await TeamSettingsRepo.attemptToAcceptInviteToken(
      idToUse
    );

    return {
      props: {
        isSuccess: updateCount > 0,
      },
    };
  } catch (err) {
    console.error(err);

    return {
      props: {
        inviteToken: null,
      },
    };
  }
};

export default TeamInvitePage;
