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
exports.getReview = void 0;
const getReviewDetails_1 = require("../../../application/businesslogics/user/getReviewDetails");
const getReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { bookingId, providerId } = req.query;
        if (!bookingId || !providerId) {
            return res.status(400).json({ message: "bookingId and providerId are required." });
        }
        const review = yield (0, getReviewDetails_1.getReviewDetails)(userId, bookingId, providerId);
        if (!review) {
            return res.status(404).json({ message: "No review found for this booking." });
        }
        return res.status(200).json({ review });
    }
    catch (error) {
        console.error("Error fetching review:", error);
        return res.status(500).json({
            message: "Failed to fetch review. Please try again later.",
        });
    }
});
exports.getReview = getReview;
//# sourceMappingURL=reviewDetails.js.map