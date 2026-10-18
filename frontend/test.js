const assert = require('assert');
const http = require('http');
const server = require('./server.js');

const testServer = server.listen(0, () => {
  const port = testServer.address().port;
  http.get(`http://localhost:${port}/health`, (res) => {
    assert.strictEqual(res.statusCode, 200, 'Expected 200 on Frontend /health');
    console.log('✅ Frontend Unit Test Passed: /health returned 200 OK');
    testServer.close();
    process.exit(0);
  }).on('error', (err) => {
    console.error('❌ Frontend Test Failed:', err);
    testServer.close();
    process.exit(1);
  });
});
