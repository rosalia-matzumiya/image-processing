/*
 * Project: COMP1320 Milestone 1
 * File Name: main.js
 * Description: 
 * 
 * Created Date: 06/30/2022
 * Author: Rosalia Matzumiya Garcia
 * 
 */

const IOhandler = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;


  IOhandler.unzip(zipFilePath, pathUnzipped)
    .then(() => {
      console.log("Extraction operation complete")
      return IOhandler.readDir(pathUnzipped);
    },
      (e) => console.log("Error:", e)
    )
    .then((data) => IOhandler.grayScale(data, pathProcessed))
    .catch((err) => console.log("Error:", err))

