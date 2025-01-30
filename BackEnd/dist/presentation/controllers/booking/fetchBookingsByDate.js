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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserBookingsbyTime = void 0;
const bookingService_1 = require("../../../application/businesslogics/bookingService");
const getUserBookingsbyTime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { providerId, selectedTime, selectedDate } = req.query;
        if (!providerId) {
            return res.status(400).json({ message: "providerId is required." });
        }
        const bookings = yield (0, bookingService_1.getUserBookingsBySelectedTime)(providerId, selectedTime, selectedDate);
        res.status(200).json({ bookings });
    }
    catch (error) {
        console.error("Error in getUserBookingsbyTime:", error);
        res.status(500).json({ message: "Failed to retrieve bookings", error: error });
    }
});
exports.getUserBookingsbyTime = getUserBookingsbyTime;
//# sourceMappingURL=fetchBookingsByDate.js.map