/*
 * Project: COMP1320 Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 * 
 * Created Date: 06/30/2022
 * Author: Rosalia Matzumiya Garcia
 * 
 */

const unzipper = require('unzipper'),
  fs = require('fs'),
  PNG = require('pngjs').PNG,
  path = require('path'),
  EXTENSION = '.png',
  FOLDER_PATH = 'unzipped',
  FILE_PATH = path.join(__dirname, FOLDER_PATH);


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
      .pipe(unzipper.Extract({ path: pathOut }))
      .on('entry', entry => entry.autodrain())
  });
};

/**
 * Description: read all the png files from given directory 
 * and return Promise containing array of each png file path 
 * 
 * @param {string} path 
 * @return {promise}
 */
const readDir = dir => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        if (err.code === "ENOENT") {
          fs.mkdir(FILE_PATH, err => {
            if (err) {
              if (err.code === "EEXIST") {
                console.log("Sorry this folder name already exists. Please choose another name.");
              }
              else {
                reject(err);
              }
            }
            console.log(`The directory ${dir} has been created for you`);
          })
        }
      } else {
        const pngImages = [];
        files.forEach((file) => {
          if (path.extname(FILE_PATH + `/${file}`) === EXTENSION) {
            pngImages.push(file);
          }
        })
        resolve(pngImages)
      }
    })
  })
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
    if (err) {
      reject(err);
    } else {
      pathIn.forEach((pngImg) => {
        fs.createReadStream(FILE_PATH + `/${pngImg}`)
          .pipe(
            new PNG({
              filterType: 4,
            })
          )
          .on('parsed', function () {

            // source: https://www.npmjs.com/package/pngjs
            for (var y = 0; y < this.height; y++) {
              for (var x = 0; x < this.width; x++) {
                var idx = (this.width * y + x) << 2;

                let gray = this.data[idx] + this.data[idx + 1] +
                  0.11 + this.data[idx + 2] / 3;

                this.data[idx] = gray;
                this.data[idx + 1] = gray;
                this.data[idx + 2] = gray;

              }
            }
            this.pack().pipe(fs.createWriteStream(`${pathOut}/${pngImg}`));
          });
      });
      resolve(pathIn);
    }
  });
};

module.exports = {
  unzip,
  readDir,
  grayScale
};