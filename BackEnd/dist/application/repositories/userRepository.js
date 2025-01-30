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
exports.findReview = exports.saveData = exports.getUserById = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../../infrastructure/dbModels/user"));
const review_1 = __importDefault(require("../../infrastructure/dbModels/review"));
const saveUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_1.default(userData);
    return user.save();
});
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(userId);
    try {
        return yield user_1.default.findOne({ _id: objectId });
    }
    catch (error) {
        throw new Error(`Error fetching user from database: ${error}`);
    }
});
exports.getUserById = getUserById;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return user_1.default.findOne({ "email": email });
});
const findUserByWhatsappNumber = (whatsappNumber) => __awaiter(void 0, void 0, void 0, function* () {
    return user_1.default.findOne({ "whatsappNumber": whatsappNumber });
});
const saveData = (reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    const review = new review_1.default(reviewData);
    return yield review.save();
});
exports.saveData = saveData;
const findReview = (userId, bookingId, providerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield review_1.default.findOne({ userId, bookingId, providerId });
});
exports.findReview = findReview;
exports.default = { saveUser, getUserById: exports.getUserById, findUserByEmail, findUserByWhatsappNumber };
//# sourceMappingURL=userRepository.js.map