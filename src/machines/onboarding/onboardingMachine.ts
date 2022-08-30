import { createMachine } from 'xstate';

const onboardingMachine = createMachine({
  id: 'onboarding',
  initial: 'initial',
  predictableActionArguments: true,
  states: {
    initial: {
      on: {
        DECLARE_SELF_USER: 'selfUser',
        DECLARE_TEAM_USER: 'teamUser',
      },
    },
    selfUser: {
      id: 'selfUser',
      initial: 'selfUserDescription',
      states: {
        selfUserDescription: {
          on: {
            COMPLETE: '#onboarding.establishIndividualSettings',
          },
        },
      },
    },
    teamUser: {
      id: 'establishTeamSettings',
      initial: 'establishTeamSettings',
      states: {
        establishTeamSettings: {
          on: {
            COMPLETE: 'inviteTeammates',
          },
        },
        inviteTeammates: {
          on: {
            COMPLETE: '#onboarding.establishIndividualSettings',
          },
        },
      },
    },
    establishIndividualSettings: {
      on: {
        COMPLETE: 'success',
      },
    },
    success: {
      type: 'final',
    },
  },
});

export default onboardingMachine;
