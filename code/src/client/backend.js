let serverUrl;

// eslint-disable-next-line import/prefer-default-export
export const getServerUrl = () => {
  if (serverUrl == null) {
    const port = location.port ? `:${location.port}` : '';
    serverUrl = `${window.location.protocol}//${window.location
      .hostname}${port}`;
  }
  return serverUrl;
};
