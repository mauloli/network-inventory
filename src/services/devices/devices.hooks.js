const { disablePagination } = require('feathers-hooks-common');

const includeType = () => {
  return async context => {
    const { app } = context;
    const sequelize = app.get('sequelizeClient');
    const { type } = sequelize.models;

    const include = [type];

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
      includeType()
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
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
