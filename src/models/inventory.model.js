// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const inventory = sequelizeClient.define('inventory', {
    // name: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: {
    //     args: true,
    //     msg: 'item telah terdaftar'
    //   }
    // },
    hostname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mac_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0'
    },
    user_modified: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_location: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_device: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  inventory.associate = function (models) {
    inventory.belongsTo(models.location, {
      foreignKe: 'id_location',
      targetKey: 'id'
    });
    inventory.belongsTo(models.devices, {
      foreignKe: 'id_device',
      targetKey: 'id'
    }); inventory.belongsTo(models.users, {
      foreignKe: 'id_user',
      targetKey: 'id'
    });
  };

  return inventory;
};
