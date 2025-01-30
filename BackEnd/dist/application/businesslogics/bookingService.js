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
exports.getUserBookingsBySelectedTime = exports.getUserBookings = void 0;
const bookingRepository_1 = __importDefault(require("../repositories/bookingRepository"));
const booking_1 = __importDefault(require("../../infrastructure/dbModels/booking"));
const execute = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, providerId, selectedDate, selectedTime, payment } = bookingData;
    if (!payment || typeof payment.amount !== "number" || payment.amount <= 0) {
        throw new Error("Invalid payment amount.");
    }
    const newBooking = yield bookingRepository_1.default.saveBooking({
        userId,
        providerId,
        selectedDate,
        selectedTime,
        createdAt: new Date(),
        payment: {
            method: payment.method || "pending",
            amount: payment.amount,
            status: payment.status || "pending",
        },
    });
    return newBooking;
});
const getUserBookings = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId)
        throw new Error("User ID is required");
    return yield bookingRepository_1.default.getBookingsByUserId(userId);
});
exports.getUserBookings = getUserBookings;
const getUserBookingsBySelectedTime = (providerId, selectedTime, selectedDate) => __awaiter(void 0, void 0, void 0, function* () {
    if (!providerId) {
        throw new Error("providerId is required.");
    }
    // Construct query
    const query = { providerId };
    // Add time slot filter if provided
    if (selectedTime) {
        query.selectedTimeSlot = selectedTime;
    }
    // Add date range filter if selectedDate is provided
    if (selectedDate) {
        const startOfDay = new Date(selectedDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(selectedDate);
        endOfDay.setHours(23, 59, 59, 999);
        query.selectedDate = { $gte: startOfDay, $lte: endOfDay };
    }
    console.log(query, "qqqqqqqqqqqqqqqq");
    console.log("Query Date Range (Backend):", query.selectedDate);
    try {
        // Query the database
        const bookings = yield booking_1.default.find(query);
        return bookings;
    }
    catch (error) {
        console.error("Error fetching bookings:", error);
        throw new Error("Failed to fetch bookings.");
    }
});
exports.getUserBookingsBySelectedTime = getUserBookingsBySelectedTime;
exports.default = { execute, getUserBookings: exports.getUserBookings, getUserBookingsBySelectedTime: exports.getUserBookingsBySelectedTime };
//# sourceMappingURL=bookingService.js.map