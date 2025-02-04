"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.NODE_ENV === 'production' ? (process.env.UPLOADPATH || "") : 'uploads');
    },
    filename: function (req, file, cb) {
        let ext = path_1.default.extname(file.originalname); // Get the file extension
        let name = path_1.default.basename(file.originalname, ext); // Get filename without extension
        console.log(file.originalname, "-----------file.originalname-----------");
        // Sanitize filename: remove spaces and special characters
        name = name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_]/g, '');
        // Generate new filename
    }
});
console.log("multerReached");
// Create the Multer instance with the specified storage configuration
const upload = (0, multer_1.default)({
    storage: storage
});
exports.default = upload;
//# sourceMappingURL=multer.js.map