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
exports.getReviewDetails = void 0;
const userRepository_1 = require("../../repositories/userRepository");
const getReviewDetails = (userId, bookingId, providerId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId || !bookingId || !providerId) {
        throw new Error("All parameters (userId, bookingId, providerId) are required");
    }
    const review = yield (0, userRepository_1.findReview)(userId, bookingId, providerId);
    return review;
});
exports.getReviewDetails = getReviewDetails;
//# sourceMappingURL=getReviewDetails.js.map