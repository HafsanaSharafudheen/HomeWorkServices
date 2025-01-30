"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workingProgressUpdate = void 0;
const booking_1 = __importDefault(require("../../../infrastructure/dbModels/booking"));
const workingProgressUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { bookingId, title, description } = req.body;
        const photos = ((_a = req.files) === null || _a === void 0 ? void 0 : _a.photos)
            ? req.files.photos.map((file) => file.path)
            : [];
        const videos = ((_b = req.files) === null || _b === void 0 ? void 0 : _b.videos)
            ? req.files.videos.map((file) => file.path)
            : [];
        const update = {
            title,
            description,
            photos,
            videos,
            time: new Date(),
        };
        const updatedBooking = yield booking_1.default.findByIdAndUpdate(bookingId, { $push: { workingUpdates: update } }, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({ message: "Work updates added successfully", booking: updatedBooking });
    }
    catch (error) {
        console.error("Error updating work details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.workingProgressUpdate = workingProgressUpdate;
//# sourceMappingURL=workingProgressUpdate.js.map