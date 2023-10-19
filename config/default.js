const {
  HOST,
  PORT,
  JWT_SECRET,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
} = process.env;

module.exports = {
  host: HOST,
  port: PORT,
  public: '../public/',
  paginate: {
    default: 10,
    max: 50
  },
  authentication: {
    entity: 'user',
    service: 'users',
    secret: JWT_SECRET,
    authStrategies: [
      'jwt',
      'local',
      'local-username'
    ],
    jwtOptions: {
      header: {
        typ: 'access'
      },
      audience: 'https://yourdomain.com',
      issuer: 'feathers',
      algorithm: 'HS256',
      expiresIn: '1d'
    },
    local: {
      usernameField: 'email',
      passwordField: 'password'
    },
    'local-username': {
      usernameField: 'username',
      passwordField: 'password'
    }
  },
  mysql: `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
};
