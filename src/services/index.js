const users = require('./users/users.service.js');
const inventory = require('./inventory/inventory.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(inventory);
};
