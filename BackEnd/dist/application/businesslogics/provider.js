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
exports.searchDIYS = exports.createDIYService = exports.updateBookingStatusByProvider = exports.findAllBookingsData = exports.fetchDataWithDate = exports.getDashboardData = exports.updateProviderAvailable = void 0;
const booking_1 = __importDefault(require("../../infrastructure/dbModels/booking"));
const serviceProvider_1 = __importDefault(require("../../infrastructure/dbModels/serviceProvider"));
const providerRepository_1 = require("../repositories/providerRepository");
const findProviderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const provider = yield serviceProvider_1.default.findOne({ _id: id });
    console.log("provider from the finproviderby id", provider);
    if (!provider) {
        throw new Error("No service provider found");
    }
    return provider;
});
const updateProviderProfile = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield serviceProvider_1.default.updateOne({ _id: userId }, { $set: updateData });
    if (!result || result.modifiedCount === 0) {
        throw new Error("No service provider found or no changes made");
    }
    return result;
});
const findAllProvidersByCategory = (serviceCategory) => __awaiter(void 0, void 0, void 0, function* () {
    // const providers = await Provider.find({
    //   serviceCategory: { $regex: new RegExp(serviceCategory, "i") }
    const providers = yield serviceProvider_1.default.aggregate([
        {
            $match: {
                serviceCategory: { $regex: new RegExp(serviceCategory, "i") }, // Match service category
            },
        },
        {
            $lookup: {
                from: "reviews", // Join with reviews collection
                let: { providerId: "$_id" }, // Pass provider's `_id` to the pipeline
                pipeline: [
                    {
                        $addFields: {
                            providerId: { $toObjectId: "$providerId" }, // Convert providerId to ObjectId
                        },
                    },
                    {
                        $match: {
                            $expr: { $eq: ["$providerId", "$$providerId"] }, // Match providerId in reviews
                        },
                    },
                    {
                        $addFields: {
                            userId: { $toObjectId: "$userId" }, // Convert userId to ObjectId for matching
                        },
                    },
                    {
                        $lookup: {
                            from: "users", // Join with users collection
                            localField: "userId", // userId in reviews
                            foreignField: "_id", // _id in users
                            as: "userDetails", // Alias for the joined user data
                        },
                    },
                    {
                        $unwind: {
                            path: "$userDetails", // Flatten the user details array
                        },
                    },
                ],
                as: "reviews",
            },
        },
        {
            $addFields: {
                averageRating: { $ifNull: [{ $avg: "$reviews.ratings" }, 0] }, // Default to 0 if no ratings
                totalReviews: { $size: "$reviews" }, // Count total reviews
            },
        },
    ]);
    console.log("Providers with all fields and reviews:", providers);
    return providers;
});
const updateProviderAvailable = (userId, isAvailable) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const provider = yield serviceProvider_1.default.findById(userId);
        if (!provider) {
            throw new Error("No service provider found");
        }
        const result = yield serviceProvider_1.default.updateOne({ _id: userId }, { $set: { isAvailable: isAvailable } });
        if (!result || result.modifiedCount === 0) {
            throw new Error("Failed to update availability status");
        }
        return result;
    }
    catch (error) {
        console.error("Error updating availability:", error);
        throw error;
    }
});
exports.updateProviderAvailable = updateProviderAvailable;
const getDashboardData = (providerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch total bookings for the provider
        const totalBookings = yield booking_1.default.countDocuments({ providerId });
        // Aggregate bookings by date
        const bookingsByDate = yield booking_1.default.aggregate([
            { $match: { providerId } },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                        day: { $dayOfMonth: "$createdAt" },
                    },
                    count: { $sum: 1 },
                },
            },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
        ]);
        // Aggregate payment statuses
        const paymentStatus = yield booking_1.default.aggregate([
            { $match: { providerId } },
            {
                $group: {
                    _id: "$paymentStatus",
                    count: { $sum: 1 },
                },
            },
        ]);
        return {
            totalBookings,
            bookingsByDate: {
                labels: bookingsByDate.map((item) => `${item._id.year}-${item._id.month}-${item._id.day}`),
                data: bookingsByDate.map((item) => item.count),
            },
            paymentStatus: {
                labels: paymentStatus.map((item) => item._id),
                data: paymentStatus.map((item) => item.count),
            },
        };
    }
    catch (error) {
        console.error("Error aggregating dashboard data:", error);
        throw new Error("Failed to aggregate dashboard data");
    }
});
exports.getDashboardData = getDashboardData;
const fetchDataWithDate = (startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch bookings within the date range
    const bookings = yield (0, providerRepository_1.fetchBookingsByDateRange)(startDate, endDate);
    // Count total bookings-----To provide a quick summary of the total bookings
    const totalBookings = bookings.length;
    //Initializes an object to store the count of bookings for 
    // each payment status (pending, completed, and cancelled). 
    const paymentStatusCounts = {
        pending: 0,
        completed: 0,
        cancelled: 0,
    };
    //Loops through each booking in the bookings array.
    bookings.forEach((booking) => {
        if (booking.payment.status === "pending" ||
            booking.payment.status === "completed" ||
            booking.payment.status === "cancelled") {
            // Increments the respective status count in paymentStatusCounts
            paymentStatusCounts[booking.payment.status] += 1;
        }
    });
    //Initializes an empty object to store the count of bookings for each date.
    const bookingsByDate = {};
    // Count bookings for each date
    bookings.forEach((booking) => {
        //Converts the selectedDate of the booking into a YYYY-MM-DD string format.
        const date = booking.selectedDate.toISOString().split("T")[0];
        //Increments the count for that date in bookingsByDate. 
        // If the date is not already in the object, it initializes it to 0 before adding 1.
        bookingsByDate[date] = (bookingsByDate[date] || 0) + 1;
    });
    return {
        totalBookings,
        bookingsByDate: {
            labels: Object.keys(bookingsByDate), //An array of all unique dates 
            data: Object.values(bookingsByDate), // An array of counts for each date
        },
        paymentStatus: {
            labels: Object.keys(paymentStatusCounts), // An array of all payment statuses
            data: Object.values(paymentStatusCounts), //: An array of counts for each payment status.
        },
    };
});
exports.fetchDataWithDate = fetchDataWithDate;
const findAllBookingsData = (providerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield (0, providerRepository_1.dataFetching)(providerId);
        return bookings;
    }
    catch (error) {
        console.error("Error fetching bookings from the database:", error);
        throw new Error("Failed to fetch bookings.");
    }
});
exports.findAllBookingsData = findAllBookingsData;
const updateBookingStatusByProvider = (bookingId, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield booking_1.default.findOneAndUpdate({ _id: bookingId }, { $set: { status: status } });
        console.log(`Booking with ID ${bookingId} status updated to accepted.`);
    }
    catch (error) {
        console.error(`Error updating booking status: ${error}`);
        throw error;
    }
});
exports.updateBookingStatusByProvider = updateBookingStatusByProvider;
const createDIYService = (diyData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, providerRepository_1.saveDIYToDB)(diyData);
});
exports.createDIYService = createDIYService;
const searchDIYS = (providerId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, providerRepository_1.findAllDiys)(providerId);
});
exports.searchDIYS = searchDIYS;
exports.default = {
    findProviderById, findAllBookingsData: exports.findAllBookingsData, updateBookingStatusByProvider: exports.updateBookingStatusByProvider,
    updateProviderProfile, getDashboardData: exports.getDashboardData, fetchDataWithDate: exports.fetchDataWithDate,
    findAllProvidersByCategory, updateProviderAvailable: exports.updateProviderAvailable, createDIYService: exports.createDIYService
};
//# sourceMappingURL=provider.js.map