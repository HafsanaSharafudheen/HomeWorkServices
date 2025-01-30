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
exports.deleteFromUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const booking_1 = __importDefault(require("../../../infrastructure/dbModels/booking"));
const deleteFromUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingId = req.body.bookingId;
        if (!bookingId) {
            return res.status(400).json({ message: "Booking ID is required." });
        }
        const objectId = new mongoose_1.default.Types.ObjectId(bookingId);
        const result = yield booking_1.default.findOneAndUpdate({ _id: objectId }, { $set: { status: "cancelled" } }, { new: true });
        console.log(objectId, result, "ppppffffffffffffffffiiiii");
        if (!result) {
            return res.status(404).json({ message: "Booking not found." });
        }
        return res.status(200).json({ message: "Booking deleted successfully." });
    }
    catch (error) {
        console.error("Error deleting booking:", error);
        return res.status(500).json({ message: "Failed to delete booking." });
    }
});
exports.deleteFromUser = deleteFromUser;
//# sourceMappingURL=DeleteBooking.js.map