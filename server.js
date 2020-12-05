const http = require('http');
const fs = require('fs').promises;
const formidable = require('formidable');
const { grayScale } = require('./IOhandler');

const hostname = 'localhost';
const port = 8080;

http
  .createServer((req, res) => {
    if (req.url === '/fileupload') {
      const form = new formidable.IncomingForm();
      form.parse(req, (err, fields, files) => {
        const outputImg = `${__dirname}/grayscaled/grayscaled.png`;
        const inputImg = files.userImage.path;
        grayScale(inputImg, outputImg);
        fs.rename(inputImg, `${__dirname}/uploaded/original.png`);
        fs.readFile(`${__dirname}/html/success.html`).then((content) => res.end(content));
      });
    } else if (req.url === '/css/styles.css') {
      res.writeHead(200, { 'Content-Type': 'text/css' });
      fs.readFile(`${__dirname}/css/styles.css`).then((content) => {
        res.end(content);
      });
    } else if (req.url.includes('.png')) {
      const filePath = `.${req.url}`;
      res.writeHead(200, { 'Content-Type': 'image/png' });
      fs.readFile(filePath).then((content) => {
        res.write(content);
        res.end(content);
      });
    } else if (req.url === '/uploaded.html') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.readFile(`${__dirname}/html/uploaded.html`).then((content) => {
        res.end(content);
      });
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.readFile(`${__dirname}/html/index.html`)
        .then((content) => {
          res.end(content);
        })
        .catch((err) => console.log(err.message));
    }
  })
  .listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
  });
