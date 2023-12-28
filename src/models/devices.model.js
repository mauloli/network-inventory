// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const devices = sequelizeClient.define('devices', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_type: {
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
  devices.associate = function (models) {
    devices.belongsTo(models.type, {
      foreignKey: 'id_type',
      targetKey: 'id'
    });
  };

  return devices;
};
