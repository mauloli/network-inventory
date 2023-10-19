const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const addRefreshToken = () => {
  return async context => {
    const { app, result } = context;
    const { user } = result;
    const { jwtOptions, } = app.get('authentication');
    const refreshToken = jwt.sign({ sub: user.id }, JWT_SECRET, jwtOptions);

    context.result = {
      user: context.result.user,
      access_token: result.accessToken,
      refresh_token: refreshToken
    };

    delete context.result.authentication;

    return context;
  };
};

module.exports = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  authentication.register('local-username', new LocalStrategy({
    name:'local-username',
    usernameField: 'username', // Customize the username field
    passwordField: 'password', // Customize the password field
  }));


  app.use('/authentication', authentication);
  app.configure(expressOauth());

  const auth = app.service('authentication');
  auth.hooks({
    before: {
      create: []
    },
    after: {
      create: [addRefreshToken()]
    }
  });
};
