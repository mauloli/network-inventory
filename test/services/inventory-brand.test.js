const assert = require('assert');
const app = require('../../src/app');

describe('\'inventory-brand\' service', () => {
  it('registered the service', () => {
    const service = app.service('inventory-brand');

    assert.ok(service, 'Registered the service');
  });
});
