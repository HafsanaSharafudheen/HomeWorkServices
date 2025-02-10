import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.NODE_ENV === 'production'? (process.env.UPLOADPATH||""):'uploads')
  },

  filename: function (req, file, cb) {
    var ext = path.extname(file.originalname); // Get the file extension
    var name = file.originalname.replace(ext, ''); // Remove the existing extension

    cb(null, name + '-' + Date.now() + ext); // Append the extension after timestamp
}
});
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/avif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only .png, .jpg, and .avif formats are allowed!'), false); // Reject the file
  }
};
console.log("multerReached")
const upload = multer({
  storage: storage,fileFilter: fileFilter
});


export default upload;