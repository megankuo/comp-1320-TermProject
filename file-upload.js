const http = require('http');
const fs = require('fs').promises;
const formidable = require('formidable');
const path = require('path');

const hostname = 'localhost';
const port = 8080;

/* TODO: Make fileUpload modular
TODO: have CSS show up on server page */

// const fileUpload = (req, res) => {
//   if (req.url == '/fileupload') {
//     let form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//       let oldPath = files.userImage.path;
//       let newPath = `${__dirname}/uploaded/${files.userImage.name}`;
//       fs.rename(oldPath, newPath);
//       res.writeHead(200, { 'Content-Type': 'text/plain' });
//       res.write('File uploaded and moved!');
//       res.end();
//     });
//   } else {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     fs.readFile(__dirname + '/html/index.html').then((content) => {
//       res.end(content);
//     });
//   }
// };

// module.exports = {
//   fileUpload,
// };

http
  .createServer(function (req, res) {
    if (req.url == '/fileupload') {
      let form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        let oldPath = files.userImage.path;
        let newPath = `${__dirname}/uploaded/${files.userImage.name}`;
        fs.rename(oldPath, newPath);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('File uploaded and moved!');
        res.end();
      });
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.readFile(__dirname + '/html/index.html').then((content) => {
        res.end(content);
      });
    }
  })
  .listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
  });
