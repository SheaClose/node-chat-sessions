module.exports = (req, res, next) => {
  console.log('mkUser');
  if (!req.session.user) {
    req.session.user = {
      messages: []
    };
  }
  next();
};
