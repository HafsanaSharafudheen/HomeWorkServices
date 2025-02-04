import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.NODE_ENV === 'production'? (process.env.UPLOADPATH||""):'uploads')
  },

  filename: function (req, file, cb) {
    var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
    // cb(null,Date.now()+path.extname(file.originalname));
    cb(null, file.originalname + '-' + Date.now() + ext);
  },
});
console.log("multerReached")
// Create the Multer instance with the specified storage configuration
const upload = multer({
  storage: storage
});


export default upload;