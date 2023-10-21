// Initializes the `inventory-brand` service on path `/inventory-brand`
const { InventoryBrand } = require('./inventory-brand.class');
const createModel = require('../../models/inventory-brand.model');
const hooks = require('./inventory-brand.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/inventory-brand', new InventoryBrand(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('inventory-brand');

  service.hooks(hooks);
};
