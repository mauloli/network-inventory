// Initializes the `brand` service on path `/brand`
const { Brand } = require('./brand.class');
const createModel = require('../../models/brand.model');
const hooks = require('./brand.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/brand', new Brand(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('brand');

  service.hooks(hooks);
};
