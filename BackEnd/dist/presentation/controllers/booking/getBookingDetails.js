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
exports.getUserBookings = void 0;
const bookingService_1 = __importDefault(require("../../../application/businesslogics/bookingService"));
const getUserBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        console.log(userId, "user......Id");
        const bookings = yield bookingService_1.default.getUserBookings(userId);
        console.log(bookings, "bokkkkkkkkkki");
        res.status(200).json({ bookings: bookings });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to retrieve bookings", error: error });
    }
});
exports.getUserBookings = getUserBookings;
//# sourceMappingURL=getBookingDetails.js.map