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
        var ext = path_1.default.extname(file.originalname); // Get the file extension
        var name = file.originalname.replace(ext, ''); // Remove the existing extension
        cb(null, name + '-' + Date.now() + ext); // Append the extension after timestamp
    }
});
console.log("multerReached");
const upload = (0, multer_1.default)({
    storage: storage
});
exports.default = upload;
//# sourceMappingURL=multer.js.map