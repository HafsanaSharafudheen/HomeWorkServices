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
console.log("multerReached")
// Create the Multer instance with the specified storage configuration
const upload = multer({
  storage: storage
});


export default upload;