const passport = require('passport'); //Will be initialized with strategy

const authenticateUser = (req, options) => {
  return new Promise((resolve, reject) => {
    const done = (error, user) => {
      if (error) return reject(new Error(err)); //error with error, null
      if (user) {
        req.login(user, error => {
          if (error) return reject(new Error(error));

          return resolve(user); //success with null, user
        });
      } else {
        return reject(new Error('Invalid password or email!')); //fail w/ null, false
      }
    };

    const authFn = passport.authenticate('graphql', options, done);
    authFn();
  });
};

exports.buildAuthContext = req => {
  const auth = {
    authenticate: options => authenticateUser(req, options), //will get options from args in resolver
    logout: () => req.logout(),
    isAuthenticated: () => req.isAuthenticated(),
    getUser: () => req.user,
  };

  return auth;
};
