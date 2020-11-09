/*
 * Project: COMP1320 Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const IOhandler = require('./IOhandler'),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;

IOhandler.unzip(zipFilePath, pathUnzipped)
  .then(() => {
    IOhandler.readDir(pathUnzipped).then((pathsArr) => {
      pathsArr.forEach((pathIn) => {
        let outFileName = pathIn.split('/');
        outFileName = outFileName[outFileName.length - 1].replace('in', 'out');
        let pathOut = `${pathProcessed}/${outFileName}`;
        IOhandler.grayScale(pathIn, pathOut);
      });
    });
  })
  .catch((err) => console.log(err));
