/*
 * Project: COMP1320 Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

const unzipper = require('unzipper'),
  fs = require('fs'),
  PNG = require('pngjs').PNG,
  path = require('path');

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(pathIn)
      .pipe(
        unzipper.Extract({ path: pathOut }).on('close', () => {
          console.log('Extraction operation complete');
          resolve();
        })
      )
      .on('err', reject);
  });
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} dir
 * @return {promise}
 */
const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, 'utf-8', (err, files) => {
      if (err) {
        reject(err);
      } else {
        const pngPathArr = [];
        for (let i = 0; i < files.length; i++) {
          if (files[i].includes('.png')) {
            let pngFilePath = path.join(__dirname, 'unzipped', files[i]);
            pngPathArr.push(pngFilePath);
          }
        }
        resolve(pngPathArr);
      }
    });
  });
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(pathIn)
      .pipe(new PNG())
      .on('parsed', function () {
        for (let y = 0; y < this.height; y++) {
          for (let x = 0; x < this.width; x++) {
            let idx = (this.width * y + x) << 2;
            let red = this.data[idx];
            let green = this.data[idx + 1];
            let blue = this.data[idx + 2];
            let gray = red * 0.3 + green * 0.59 + blue * 0.11;
            this.data[idx] = gray;
            this.data[idx + 1] = gray;
            this.data[idx + 2] = gray;
          }
        }
        resolve(this.pack().pipe(fs.createWriteStream(pathOut)));
      })
      .on('error', reject);
  });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
