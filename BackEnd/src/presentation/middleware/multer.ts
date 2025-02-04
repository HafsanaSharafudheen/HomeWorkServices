import multer from 'multer';
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.NODE_ENV === 'production'? (process.env.UPLOADPATH||""):'uploads')
  },

  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname); // Get the file extension
    let name = path.basename(file.originalname, ext); // Get filename without extension

    console.log(file.originalname, "-----------file.originalname-----------");

    // Sanitize filename: remove spaces and special characters
    name = name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_]/g, '');

    // Generate new filename
  }
});
console.log("multerReached")
// Create the Multer instance with the specified storage configuration
const upload = multer({
  storage: storage
});


export default upload;