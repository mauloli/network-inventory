// Initializes the `type` service on path `/type`
const { Type } = require('./type.class');
const createModel = require('../../models/type.model');
const hooks = require('./type.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/type', new Type(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('type');

  service.hooks(hooks);
};
