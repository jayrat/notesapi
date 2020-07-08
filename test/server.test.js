/**
 * Server Tests
 */

const request = require('supertest');

describe('Server Running', () => {
  let server;
  // Load and run Server before each test
  beforeEach(() => {
    server = require('../server');
  });
  // Close Server after each test
  afterEach(() => {
    server.close();
  });
  it('Gets 200 OK, response on GET /', (done) => {
    request(server)
      .get('/')
      .expect(200, done)
  });
});
