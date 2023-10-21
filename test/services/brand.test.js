const assert = require('assert');
const app = require('../../src/app');

describe('\'brand\' service', () => {
  it('registered the service', () => {
    const service = app.service('brand');

    assert.ok(service, 'Registered the service');
  });
});
