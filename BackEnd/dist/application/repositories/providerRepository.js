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
exports.findAllDiys = exports.saveDIYToDB = exports.dataFetching = exports.fetchBookingsByDateRange = void 0;
const serviceProvider_1 = __importDefault(require("../../infrastructure/dbModels/serviceProvider"));
const booking_1 = __importDefault(require("../../infrastructure/dbModels/booking"));
const diy_1 = __importDefault(require("../../infrastructure/dbModels/diy"));
const saveUser = (providerData) => __awaiter(void 0, void 0, void 0, function* () {
    const provider = new serviceProvider_1.default(providerData);
    return provider.save();
});
const fetchBookingsByDateRange = (startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    return yield booking_1.default.find({
        selectedDate: {
            $gte: startDate,
            $lte: endDate,
        },
    });
});
exports.fetchBookingsByDateRange = fetchBookingsByDateRange;
const dataFetching = (providerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield booking_1.default.aggregate([
            {
                $match: { providerId: providerId }
            },
            {
                $addFields: {
                    userId: { $toObjectId: "$userId" } // Convert userId to ObjectId
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
        ]);
        return bookings;
    }
    catch (error) {
        console.error('Error in data fetching:', error);
        throw new Error('Failed to fetch data.');
    }
});
exports.dataFetching = dataFetching;
const saveDIYToDB = (diyData) => __awaiter(void 0, void 0, void 0, function* () {
    const diy = new diy_1.default(diyData);
    return yield diy.save();
});
exports.saveDIYToDB = saveDIYToDB;
const findAllDiys = (providerId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield diy_1.default.find({ providerId: providerId });
    return result;
});
exports.findAllDiys = findAllDiys;
const findProviderByWhatsappNumber = (whatsappNumber) => __awaiter(void 0, void 0, void 0, function* () {
    return serviceProvider_1.default.findOne({ "whatsappNumber": whatsappNumber });
});
exports.default = { saveUser, findProviderByWhatsappNumber };
//# sourceMappingURL=providerRepository.js.map