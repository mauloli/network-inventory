const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const includerole = () => {
  return async context => {
    const { app } = context;
    const sequelize = app.get('sequelizeClient');
    const { role } = sequelize.models;

    const include = [role];

    Object.assign(context.params, {
      sequelize: {
        include,
        raw: false
      }
    });

    return context;
  };
};

module.exports = {
  before: {
    all: [],
    find: [
      authenticate('jwt'),
      includerole()
    ],
    get: [authenticate('jwt')],
    create: [hashPassword('password')],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [hashPassword('password'), authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
