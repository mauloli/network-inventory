const users = require('./users/users.service.js');
const inventory = require('./inventory/inventory.service.js');
const brand = require('./brand/brand.service.js');
const inventoryBrand = require('./inventory-brand/inventory-brand.service.js');
const location = require('./location/location.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(inventory);
  app.configure(brand);
  app.configure(inventoryBrand);
  app.configure(location);
};
