const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});


const fileFilter = (req, file, cb) => {
  const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
  if (!allowedExtensions.exec(file.originalname)) {
    return cb(new Error('Invalid file type. Only JPG, JPEG, and PNG files are allowed.'));
  }
  cb(null, true);
};


const upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 },  //1Md
  fileFilter: fileFilter,
});

module.exports = upload;
