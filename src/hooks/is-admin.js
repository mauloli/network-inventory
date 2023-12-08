// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const errors = require('@feathersjs/errors');
const { path } = require('ramda');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const roleId = path(['params', 'user', 'id_role']);

    if (roleId(context) !== 1) {
      throw new errors.NotAcceptable({
        error_desc: 'NOT_ACCEPTABLE',
        message: 'need administration '
      });
    }

    return context;
  };
};
