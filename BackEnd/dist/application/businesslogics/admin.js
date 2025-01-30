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
exports.fetchAllAdminSideCategories = exports.addNewCategory = exports.fetchAdminProfileDetails = exports.updateProviderBlockStatus = exports.updateUserBlockStatus = exports.getDashboardDetails = void 0;
const serviceProvider_1 = __importDefault(require("../../infrastructure/dbModels/serviceProvider"));
const user_1 = __importDefault(require("../../infrastructure/dbModels/user"));
const category_1 = __importDefault(require("../../infrastructure/dbModels/category"));
const booking_1 = __importDefault(require("../../infrastructure/dbModels/booking"));
const mongoose_1 = __importDefault(require("mongoose"));
const findAllProviders = () => __awaiter(void 0, void 0, void 0, function* () {
    const providers = yield serviceProvider_1.default.find();
    if (!providers || providers.length === 0) {
        console.warn("No providers found in the database.");
    }
    return providers;
});
const findAllUsers = (page, limit, search, filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * limit;
        const searchQuery = Object.assign(Object.assign({}, (search
            ? {
                $or: [
                    { fullName: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                    { phone: { $regex: search, $options: "i" } },
                    { "address.city": { $regex: search, $options: "i" } },
                    { "address.district": { $regex: search, $options: "i" } },
                ],
            }
            : {})), { isAdmin: { $ne: true } });
        const sortOptions = {};
        if (filter === "alphabetical") {
            sortOptions.fullName = 1; // Sort by fullName in ascending order
        }
        else if (filter === "date") {
            sortOptions.createdAt = -1; // Sort by creation date in descending order
        }
        const users = yield user_1.default.find(searchQuery).sort(sortOptions).skip(skip).limit(limit);
        const totalCount = yield user_1.default.countDocuments(searchQuery);
        if (!users || users.length === 0) {
            console.warn("No users found in the database.");
        }
        return { users, totalCount };
    }
    catch (error) {
        console.error("Error fetching users in findAllUsers:", error);
        throw new Error("Failed to fetch users.");
    }
});
const findAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield booking_1.default.aggregate([
            {
                $lookup: {
                    from: "users",
                    //Defines a variable userId, 
                    // which is the userId field from the Booking document converted to an ObjectId.
                    let: { userId: { $toObjectId: "$userId" } },
                    pipeline: [
                        //Matches documents in the users collection where the _id 
                        // field equals the userId variable.
                        { $match: { $expr: { $eq: ["$_id", "$$userId"] } } }
                    ],
                    as: "userDetails",
                },
            },
            {
                $lookup: {
                    from: "providers",
                    let: { providerId: { $toObjectId: "$providerId" } },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$providerId"] } } }
                    ],
                    as: "providerDetails",
                },
            },
        ]);
        if (!bookings || bookings.length === 0) {
            console.warn("No bookings found in the database.");
        }
        return bookings;
    }
    catch (error) {
        console.error("Error fetching bookings with user and provider details:", error);
        throw error;
    }
});
const getDashboardDetails = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalBookings = yield booking_1.default.countDocuments();
    const totalUsers = yield user_1.default.countDocuments();
    const totalServiceProviders = yield serviceProvider_1.default.countDocuments();
    const totalCategories = yield category_1.default.countDocuments();
    // Aggregate bookings by date
    const bookingsByDate = yield booking_1.default.aggregate([
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
        {
            $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
        },
    ]);
    // Aggregate bookings by time
    const bookingsByTime = yield booking_1.default.aggregate([
        {
            $group: {
                _id: "$selectedTime",
                count: { $sum: 1 },
            },
        },
        {
            $sort: { count: -1 },
        },
    ]);
    // Aggregate payment status
    const paymentStatus = yield booking_1.default.aggregate([
        {
            $group: {
                _id: "$payment.status",
                count: { $sum: 1 },
            },
        },
    ]);
    return {
        totalBookings,
        totalUsers,
        totalServiceProviders,
        totalCategories,
        bookingsByDate: {
            labels: bookingsByDate.map((item) => `${item._id.year}-${item._id.month}-${item._id.day}`),
            data: bookingsByDate.map((item) => item.count),
        },
        bookingsByTime: {
            labels: bookingsByTime.map((item) => item._id),
            data: bookingsByTime.map((item) => item.count),
        },
        paymentStatus: {
            labels: paymentStatus.map((item) => item._id),
            data: paymentStatus.map((item) => item.count),
        },
    };
});
exports.getDashboardDetails = getDashboardDetails;
const updateUserBlockStatus = (userId, isBlocked) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(userId);
    const user = yield user_1.default.findByIdAndUpdate(objectId, { isBlocked }, { new: true });
    if (!user)
        throw new Error("User not found");
    return user;
});
exports.updateUserBlockStatus = updateUserBlockStatus;
const updateProviderBlockStatus = (providerId, isBlocked) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(providerId);
    console.log(objectId, "-------------objectId");
    const provider = yield serviceProvider_1.default.findByIdAndUpdate(objectId, { isBlocked }, { new: true });
    if (!provider)
        throw new Error("Provider not found");
    return provider;
});
exports.updateProviderBlockStatus = updateProviderBlockStatus;
const fetchAdminProfileDetails = (adminId) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(adminId);
    const adminDetails = yield user_1.default.findOne({ _id: objectId });
    return adminDetails;
});
exports.fetchAdminProfileDetails = fetchAdminProfileDetails;
const addNewCategory = (categoryName, categoryImage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCategory = yield category_1.default.create({
            categoryName,
            categoryImage,
        });
        console.log("Category created:", newCategory);
        return newCategory;
    }
    catch (error) {
        console.error("Error creating category:", error.message);
        throw new Error("Failed to create category.");
    }
});
exports.addNewCategory = addNewCategory;
const fetchAllAdminSideCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    return category_1.default.find();
});
exports.fetchAllAdminSideCategories = fetchAllAdminSideCategories;
exports.default = { findAllProviders, updateProviderBlockStatus: exports.updateProviderBlockStatus,
    findAllUsers, findAllBookings, fetchAllAdminSideCategories: exports.fetchAllAdminSideCategories,
    getDashboardDetails: exports.getDashboardDetails, updateUserBlockStatus: exports.updateUserBlockStatus, addNewCategory: exports.addNewCategory, };
//# sourceMappingURL=admin.js.map