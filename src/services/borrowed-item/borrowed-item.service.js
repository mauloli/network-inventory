// Initializes the `borrowed-item` service on path `/borrowed-item`
const { BorrowedItem } = require('./borrowed-item.class');
const createModel = require('../../models/borrowed-item.model');
const hooks = require('./borrowed-item.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/borrowed-item', new BorrowedItem(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('borrowed-item');

  service.hooks(hooks);
};
