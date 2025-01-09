import multer from 'multer';
console.log('1...............multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },

  filename: function (req, file, cb) {
    var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
    // cb(null,Date.now()+path.extname(file.originalname));
    cb(null, file.originalname + '-' + Date.now() + ext);
  },
});
console.log('2...............multer')

// Create the Multer instance with the specified storage configuration
const upload = multer({
  storage: storage
});
console.log('3...............multer')


export default upload;