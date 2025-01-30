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
exports.SaveReview = void 0;
const saveReviewFromUser_1 = require("../../../application/businesslogics/user/saveReviewFromUser");
const SaveReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { bookingId, providerId, ratings, message } = req.body;
        const workImage = ((_a = req.files["workImage"]) === null || _a === void 0 ? void 0 : _a.map((file) => file.path)) || [];
        const workVideo = ((_b = req.files["workVideo"]) === null || _b === void 0 ? void 0 : _b.map((file) => file.path)) || [];
        if (!bookingId || !providerId || !ratings || !message) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const reviewData = {
            bookingId,
            providerId,
            userId: req.user.id,
            ratings: parseInt(ratings, 10),
            message,
            workImage,
            workVideo,
            createdAt: new Date(),
        };
        const savedReview = yield (0, saveReviewFromUser_1.saveReviewDetails)(reviewData);
        return res.status(201).json({
            message: "Review submitted successfully!",
            review: savedReview,
        });
    }
    catch (error) {
        console.error("Error saving review:", error);
        return res
            .status(500)
            .json({ message: "Failed to save the review. Try again later." });
    }
});
exports.SaveReview = SaveReview;
//# sourceMappingURL=saveReviewFromUser.js.map