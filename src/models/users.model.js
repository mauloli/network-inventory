// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_role: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
    }
  }, {
    hooks: {
      beforeValidate(user) {
        if (!user.username) {
          throw new Error('Setidaknya harus ada email atau username');
        }
      },
      beforeCount(options) {
        options.raw = true;
      }
    },
  });

  // eslint-disable-next-line no-unused-vars
  users.associate = function (models) {
    users.belongsTo(models.role,{
      foreignKey: 'id_role',
      targetKey: 'id'
    });
  };

  return users;
};
