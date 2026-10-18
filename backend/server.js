const http = require('http');
const port = process.env.PORT || 4000;
const APP_VERSION = process.env.APP_VERSION || "1.0.0";

const server = http.createServer((req, res) => {
  // Enable CORS so the frontend on Render can call the backend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/health') {
    res.writeHead(200);
    return res.end(JSON.stringify({ status: "healthy", version: APP_VERSION }));
  }

  if (req.url === '/api/data') {
    res.writeHead(200);
    return res.end(JSON.stringify({
      service: "Backend API",
      version: APP_VERSION,
      message: "Connected successfully from Backend to Frontend via Harness CI/CD!"
    }));
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Route not found" }));
});

if (require.main === module) {
  server.listen(port, () => console.log(`Backend listening on port ${port}`));
}
module.exports = server;
