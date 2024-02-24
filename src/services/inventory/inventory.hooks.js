const { authenticate } = require('@feathersjs/authentication').hooks;
const { disablePagination } = require('feathers-hooks-common');
const isAdmin = require('../../hooks/is-admin');
const generateQrcode = require('../../hooks/generate-qrcode');

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

const includeDevice = () => {
  return async context => {
    const { app } = context;
    const sequelize = app.get('sequelizeClient');
    const { devices, type, location } = sequelize.models;

    const include = [
      { model: devices, include: [type] },
      { model: location }
    ];

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
      disablePagination(),
      includeDevice()
    ],
    get: [
      includeDevice()
    ],
    create: [
      authenticate('jwt'),
      handleUser(),
      // isAdmin(),
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
    create: [
      generateQrcode(),
    ],
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
