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
  // pathIn = ./myfile.zip OR path.join(__dirname, "myfile.zip")
  return new Promise((resolve, reject) => {
    // read a zip and unzip it
    fs.createReadStream(pathIn)
      .pipe(
        unzipper.Extract({ path: pathOut }).on('close', () => {
          // show messages "Extraction operation complete"
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
    // read the directory
    fs.readdir(dir, 'utf-8', (err, files) => {
      if (err) {
        reject(err);
      } else {
        // returns location of each picture file
        const pngPathArr = [];
        for (let i = 0; i < files.length; i++) {
          if (files[i].includes('.png')) {
            let pngFilePath = path.join(__dirname, 'unzipped', files[i]); // './unzipped/in1.png'
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
    // read image path
    // use pngjs to convert to RAW pixels
    fs.createReadStream(pathIn)
      .pipe(new PNG())
      .on('parsed', function () {
        // loop through pixels and convert each into grayscale (use algorithm)
        for (let y = 0; y < this.height; y++) {
          for (let x = 0; x < this.width; x++) {
            let idx = (this.width * y + x) << 2;

            // grayscale formula
            let red = this.data[idx];
            let green = this.data[idx + 1];
            let blue = this.data[idx + 2];
            let gray = red * 0.3 + green * 0.59 + blue * 0.11;
            this.data[idx] = gray;
            this.data[idx + 1] = gray;
            this.data[idx + 2] = gray;
          }
        }
        // use pngjs to convert back to png file
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
