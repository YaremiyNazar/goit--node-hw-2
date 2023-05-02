const fs = require("fs/promises");
const path = require("path");

const renemeUploadFile = async (file, resultDir) => {
  const { path: tmpUpload, filename } = file;
  const resultUpload = path.join(resultDir, filename);
  await fs.rename(tmpUpload, resultUpload);
};

module.exports = renemeUploadFile;
