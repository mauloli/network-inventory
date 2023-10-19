const assert = require('assert');
const app = require('../../src/app');

describe('\'borrowed-item\' service', () => {
  it('registered the service', () => {
    const service = app.service('borrowed-item');

    assert.ok(service, 'Registered the service');
  });
});
