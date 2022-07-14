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
  fs = require("fs"),
  PNG = require('pngjs').PNG,
  path = require('path'),
  EXTENSION = ".png";


/**
 * Description: decompress file from given pathIn, write to given pathOut 
 *  
 * @param {string} pathIn 
 * @param {string} pathOut 
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return fs.createReadStream(pathIn)
    .pipe(unzipper.Extract({ path: pathOut }))
    .on('entry', entry => entry.autodrain())
    .promise()
    .then(() => console.log('Extraction operation complete'), err, console.log('Extraction operation failed'), err)
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path 
 * 
 * @param {string} path 
 * @return {promise}
 */
const readDir = dir => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(`Sorry this directory ${dir} doesn't exist`)
      } else {
        const pngImages = [];
        files.forEach((file) => {
          if (path.extname(`${dir}/${file}`) === EXTENSION) {
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

};

module.exports = {
  unzip,
  readDir,
  grayScale
};