const port = location.port ? `:${location.port}` : '';
const SERVER_URL = `${window.location.protocol}//${window.location
  .hostname}${port}`;

export const getServerUrl = () => SERVER_URL; // eslint-disable-line import/prefer-default-export
