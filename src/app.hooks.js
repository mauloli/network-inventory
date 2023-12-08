// Application hooks that run for every service
const { authenticate } = require('@feathersjs/authentication').hooks;

const isAdmin = require('./hooks/is-admin');
const log = require('./hooks/log');

module.exports = {
  before: {
    all: [log()],
    find: [],
    get: [],
    create: [
      authenticate('jwt')
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
