const { authenticate } = require('@feathersjs/authentication').hooks;
const { disablePagination } = require('feathers-hooks-common');
const isAdmin = require('../../hooks/is-admin');

const handleUser = () => {
  return async context => {
    const { params } = context;
    const { user } = params;

    Object.assign(context.data, {
      id_user: user.id,
      user_modified: user.id
    });

    return context;
  };
};


module.exports = {
  before: {
    all: [],
    find: [
      disablePagination(),
    ],
    get: [],
    create: [
      authenticate('jwt'),
      handleUser(),
      isAdmin()
    ],
    update: [],
    patch: [
      authenticate('jwt'),
      handleUser(),
    ],
    remove: []
  },

  after: {
    all: [],
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
