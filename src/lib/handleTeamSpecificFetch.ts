import LocalStorageKeys from '@src/LocalStorageKeys';

/**
 * Wrapper around fetch that attaches the team-id header. This wrapper is
 * required when making requests for data that is shared between the team.
 * Personal information does not require the use of this wrapper.
 */
const handleTeamSpecificFetch = async (path: string, config: RequestInit) => {
  const teamId = localStorage.getItem(LocalStorageKeys.TEAM_ID);

  const configWithTeamId: RequestInit = {
    ...config,
  };

  if (teamId) {
    const updatedHeaders = new Headers(config.headers);
    updatedHeaders.set('team-id', teamId);
    configWithTeamId.headers = updatedHeaders;
  }

  const request = new Request(path, configWithTeamId);
  const response = await fetch(request);

  if (!response.ok) {
    console.error('Error fetching data');
    console.error({ name: response.status, message: response.statusText });
    throw new Error(response.statusText);
  }

  return response;
};

export default handleTeamSpecificFetch;
