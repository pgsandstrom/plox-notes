// eslint-disable-next-line import/prefer-default-export
export const getCookie = (request, name) => {
  if (request.headers.cookie) {
    const cookie = request.headers.cookie.split(';').find(header => header.trim().startsWith(`${name}=`));
    if (cookie != null) {
      return cookie.substring(cookie.indexOf('=') + 1);
    }
  }
  return null;
};
