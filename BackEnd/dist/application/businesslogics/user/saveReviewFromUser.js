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
exports.saveReviewDetails = void 0;
const userRepository_1 = require("../../repositories/userRepository");
const saveReviewDetails = (reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!reviewData) {
        throw new Error("Review details are required.");
    }
    const savedReview = yield (0, userRepository_1.saveData)(reviewData);
    if (!savedReview) {
        throw new Error("Failed to save the review.");
    }
    return savedReview;
});
exports.saveReviewDetails = saveReviewDetails;
//# sourceMappingURL=saveReviewFromUser.js.map