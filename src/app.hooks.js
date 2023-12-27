// Application hooks that run for every service
const { authenticate } = require('@feathersjs/authentication').hooks;

const { unless } = require('feathers-hooks-common');
const isAdmin = require('./hooks/is-admin');
const log = require('./hooks/log');

const pathAuthentication = () => {
  return async context => {
    if (context.path == 'authentication') {
      return true;
    }
    return false;
  };
};

module.exports = {
  before: {
    all: [log()],
    find: [],
    get: [],
    create: [
      unless(pathAuthentication(), authenticate('jwt')
      )

    ],
    update: [],
    patch: [
      authenticate('jwt')
    ],
    remove: [
      authenticate('jwt'),
      isAdmin()
    ]
  },

  after: {
    all: [
      log()
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [
      log()
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
