export default () => (req, res, next) => {
  res.charSet('utf8');
  next();
};
