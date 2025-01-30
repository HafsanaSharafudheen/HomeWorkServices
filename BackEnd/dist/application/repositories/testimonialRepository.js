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
exports.testimonialRepository = void 0;
const review_1 = __importDefault(require("../../infrastructure/dbModels/review"));
const testimonialRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testimonilas = yield review_1.default.aggregate([
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
                    as: 'userDetails',
                }
            },
        ]);
        return testimonilas;
    }
    catch (error) {
        console.error("Error fetching testimonials from database:", error);
        throw new Error("Error fetching testimonials");
    }
});
exports.testimonialRepository = testimonialRepository;
//# sourceMappingURL=testimonialRepository.js.map