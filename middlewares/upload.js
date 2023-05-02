const multer = require("multer");
const path = require("path");
const tmpDir = path.resolve("tmp");

const multerConfig = multer.diskStorage({
    destination: tmpDir,
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${uniqueSuffix}_${file.originalname}`);
    }
});

const filetypeList = ["image/png", "image/jpeg"];

const fileFilter = (req, file, cb) => {
    const { mimetype } = file;
    if (filetypeList.includes(mimetype)) {
        cb(null, true);
    } else {
        cb({message:"Invalid format. Allow .png or .jpg"})
    }
}

const upload = multer({
    storage: multerConfig,
    fileFilter,
})

module.exports = upload;