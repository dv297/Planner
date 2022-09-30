import { ReactNode } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSession, signIn } from 'next-auth/react';

import Button from '@src/components/common/Button';
import TeamSettingsRepo from '@src/repos/TeamSettingsRepo';

interface TeamInviteProps {
  isSuccess: boolean;
  shouldCreateNewUser: boolean;
  inviteToken: string | null;
  isLoopback: boolean;
}

const TeamInvitePage = (props: TeamInviteProps) => {
  const { isSuccess, shouldCreateNewUser, inviteToken, isLoopback } = props;
  const router = useRouter();

  if (shouldCreateNewUser) {
    return (
      <>
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          Welcome!
        </h1>
        <div className="mt-4 text-center">
          <p>
            Looks like you do not have an account yet. Click the link below to
            log in and get started!
          </p>
          <div className="mt-6">
            <Button
              onClick={async () => {
                await signIn(undefined, {
                  callbackUrl: `/team-invite/?inviteToken=${inviteToken}&loopback=true`,
                });
              }}
            >
              Log in
            </Button>
          </div>
        </div>
      </>
    );
  }

  if (!isSuccess) {
    return (
      <h1>Something went wrong. Please ask your team to send another invite</h1>
    );
  }

  console.log(isLoopback);

  return (
    <>
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
        Invite Accepted!
      </h1>
      <div className="mt-4 text-center">
        {isLoopback ? (
          <p>Click the link below to get started!</p>
        ) : (
          <p>Click the link below to log in and get started!</p>
        )}
        <div className="mt-6">
          <Button
            onClick={async () => {
              const hasSession = await getSession();

              if (isLoopback && hasSession) {
                await router.push('/app/dashboard');
              } else {
                await signIn(undefined, {
                  callbackUrl: '/app/dashboard',
                });
              }
            }}
          >
            {isLoopback ? 'Navigate to dashboard' : 'Log in'}
          </Button>
        </div>
      </div>
    </>
  );
};

TeamInvitePage.getLayout = function getLayout(page: ReactNode) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-16 border-b border-gray-200 bg-white">
        <div className="flex flex-row items-center h-full pl-12">
          <h1>Planner</h1>
        </div>
      </div>
      <main className="flex flex-col bg-gray-100 flex h-full items-center justify-center flex-1">
        {page}
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const isLoopback = Array.isArray(query.loopback)
    ? query.loopback[0] === 'true'
    : query.loopback === 'true';
  const idToUse = Array.isArray(query.inviteToken)
    ? query.inviteToken[0]
    : query.inviteToken;

  const result: TeamInviteProps = {
    inviteToken: idToUse ?? null,
    isSuccess: false,
    shouldCreateNewUser: false,
    isLoopback,
  };

  if (!idToUse) {
    return {
      props: result,
    };
  }

  try {
    const updateCount = await TeamSettingsRepo.attemptToAcceptInviteToken(
      idToUse
    );

    // User does not exist
    if (updateCount === -1) {
      result.shouldCreateNewUser = true;

      return {
        props: result,
      };
    }

    result.isSuccess = updateCount > 0;

    return {
      props: result,
    };
  } catch (err) {
    console.error(err);

    return {
      props: result,
    };
  }
};

export default TeamInvitePage;
