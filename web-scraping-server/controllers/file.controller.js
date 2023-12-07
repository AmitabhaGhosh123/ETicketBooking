const fs = require('fs');
const uploadFile = require('../middleware/upload');
const baseUrl = "http://localhost:4000/";

const upload = async (req, res) => {
    try {
      await uploadFile(req, res);
      if (req.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
  
      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
      });
    } catch (err) {
      res.status(500).send({
        message: `Could not upload the file`,
      });
    }
};

const getListFiles = (req, res) => {
    const directoryPath = "uploads";
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        res.status(500).send({
          message: "Unable to scan files!",
        });
      }
      let fileInfos = [];
      files.forEach((file) => {
        fileInfos.push({
          name: file,
          url: baseUrl + directoryPath + '/' + file,
        });
      });
  
      res.status(200).send(fileInfos);
    });
};

module.exports = {
  upload,
  getListFiles,
};