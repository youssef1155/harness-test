const assert = require('assert');
const http = require('http');
const server = require('./app.js');

const testServer = server.listen(0, () => {
  const port = testServer.address().port;
  http.get(`http://localhost:${port}`, (res) => {
    assert.strictEqual(res.statusCode, 200, 'Expected status code 200');
    console.log('✅ Automated Unit Test Passed: Server returned 200 OK');
    testServer.close();
    process.exit(0);
  }).on('error', (err) => {
    console.error('❌ Test Failed:', err);
    testServer.close();
    process.exit(1);
  });
});
