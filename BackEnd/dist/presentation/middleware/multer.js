"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
        // cb(null,Date.now()+path.extname(file.originalname));
        cb(null, file.originalname + '-' + Date.now() + ext);
    },
});
console.log("multerReached");
// Create the Multer instance with the specified storage configuration
const upload = (0, multer_1.default)({
    storage: storage
});
exports.default = upload;
//# sourceMappingURL=multer.js.map