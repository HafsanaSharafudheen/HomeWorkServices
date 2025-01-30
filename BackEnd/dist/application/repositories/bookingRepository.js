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
exports.aggregatePaymentStatus = exports.aggregateBookingsByDate = exports.countBookings = void 0;
const booking_1 = __importDefault(require("../../infrastructure/dbModels/booking"));
const saveBooking = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = new booking_1.default(bookingData);
    return yield booking.save();
});
const getBookingsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield booking_1.default.aggregate([
            {
                $match: { userId: userId }
            },
            {
                // Convert providerId from string to ObjectId
                $addFields: {
                    providerId: { $toObjectId: "$providerId" }
                }
            },
            {
                $lookup: {
                    from: "providers",
                    localField: "providerId",
                    foreignField: "_id",
                    as: "providerDetails"
                }
            },
            {
                $sort: { createdAt: -1 }
            }
        ]);
        return bookings;
    }
    catch (error) {
        throw new Error(`Error fetching bookings with provider details: ${error}`);
    }
});
const countBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    return booking_1.default.countDocuments();
});
exports.countBookings = countBookings;
const aggregateBookingsByDate = () => __awaiter(void 0, void 0, void 0, function* () {
    return booking_1.default.aggregate([
        {
            $group: {
                _id: {
                    year: { $year: "$selectedDate" },
                    month: { $month: "$selectedDate" },
                    day: { $dayOfMonth: "$selectedDate" },
                },
                count: { $sum: 1 },
            },
        },
        { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);
});
exports.aggregateBookingsByDate = aggregateBookingsByDate;
const aggregatePaymentStatus = () => __awaiter(void 0, void 0, void 0, function* () {
    return booking_1.default.aggregate([
        {
            $group: {
                _id: "$payment.status",
                count: { $sum: 1 },
            },
        },
    ]);
});
exports.aggregatePaymentStatus = aggregatePaymentStatus;
exports.default = { getBookingsByUserId, saveBooking, countBookings: exports.countBookings,
    aggregatePaymentStatus: exports.aggregatePaymentStatus,
    aggregateBookingsByDate: exports.aggregateBookingsByDate };
//# sourceMappingURL=bookingRepository.js.map