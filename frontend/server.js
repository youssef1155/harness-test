const http = require('http');
const port = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || 'https://harness-test.onrender.com';

const htmlPage = `<!DOCTYPE html>
<html>
<head>
  <title>Harness Full-Stack Demo</title>
  <style>
    body { font-family: sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; }
    .card { border: 1px solid #ccc; padding: 16px; border-radius: 8px; background: #f9f9f9; }
  </style>
</head>
<body>
  <h1>Frontend Application</h1>
  <div class="card">
    <h3>Live Data from Backend:</h3>
    <pre id="output">Fetching from ${BACKEND_URL}/api/data ...</pre>
  </div>
  <script>
    fetch('${BACKEND_URL}/api/data')
      .then(res => res.json())
      .then(data => { document.getElementById('output').textContent = JSON.stringify(data, null, 2); })
      .catch(err => { document.getElementById('output').textContent = 'Error connecting to backend: ' + err; });
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: "frontend_healthy" }));
  }
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(htmlPage);
});

if (require.main === module) {
  server.listen(port, () => console.log(`Frontend running on port ${port}`));
}
module.exports = server;
