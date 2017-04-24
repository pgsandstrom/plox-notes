const port = location.port ? `:${location.port}` : '';
const SERVER_URL = `${window.location.protocol}//${window.location.hostname}${':8088'}`;

export const getServerUrl = () => SERVER_URL; // eslint-disable-line import/prefer-default-export
