// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const inventoryBrand = sequelizeClient.define('inventory_brand', {
    inventory_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  inventoryBrand.associate = function (models) {
    inventoryBrand.belongsTo(models.brand, {
      foreignKey: 'brand_id',
      targetKey: 'id'
    });
    inventoryBrand.belongsTo(models.inventory, {
      foreignKey: 'inventory_id',
      targetKey: 'id'
    });
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return inventoryBrand;
};
