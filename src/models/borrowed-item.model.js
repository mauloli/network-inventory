// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const borrowedItem = sequelizeClient.define('borrowed_item', {
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    return: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  borrowedItem.associate = function (models) {
    borrowedItem.belongsTo(models.users, {
      foreignKey: 'user_id',
      targetKey: 'id'
    });
    borrowedItem.belongsTo(models.inventory, {
      foreignKey: 'item_id',
      targetKey: 'id'
    });
  };

  return borrowedItem;
};
