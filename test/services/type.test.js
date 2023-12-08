const assert = require('assert');
const app = require('../../src/app');

describe('\'type\' service', () => {
  it('registered the service', () => {
    const service = app.service('type');

    assert.ok(service, 'Registered the service');
  });
});
