const fileUpload = require('./file-upload'),
  http = require('http');

const hostname = 'localhost';
const port = 8080;

// TODO: createServer not functional, blank page
http.createServer(fileUpload).listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
