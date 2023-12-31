const users = require('./users/users.service.js');
const inventory = require('./inventory/inventory.service.js');
// const brand = require('./brand/brand.service.js');
// const inventoryBrand = require('./inventory-brand/inventory-brand.service.js');
const location = require('./location/location.service.js');
const role = require('./role/role.service.js');
const devices = require('./devices/devices.service.js');
const type = require('./type/type.service.js');
const dashboard = require('./dashboard/dashboard.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(inventory);
  // app.configure(brand);
  // app.configure(inventoryBrand);
  app.configure(location);
  app.configure(role);
  app.configure(devices);
  app.configure(type);
  app.configure(dashboard);
};
