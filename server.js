const http = require('http');
const { pageHandler } = require('./file-upload.js');

const hostname = 'localhost';
const port = 8080;

http
  .createServer((req, res) => {
    pageHandler(req, res);
  })
  .listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
  });
