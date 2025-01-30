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
const admin_1 = require("../../../application/businesslogics/admin");
const review_1 = __importDefault(require("../../../infrastructure/dbModels/review"));
const blockProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id, "-paramaID");
    try {
        const provider = yield (0, admin_1.updateProviderBlockStatus)(req.params.id, true);
        res.status(200).json({ message: "provider blocked successfully", provider });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
const unblockProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const provider = yield (0, admin_1.updateProviderBlockStatus)(req.params.id, false);
        res.status(200).json({ message: "provider unblocked successfully", provider });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
const fetchAllReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { providerId } = req.params;
        const reviews = yield review_1.default.aggregate([
            {
                $match: { providerId },
            },
            {
                $addFields: {
                    userIdObject: { $toObjectId: "$userId" },
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userIdObject",
                    foreignField: "_id",
                    as: "userDetails",
                },
            },
            {
                $unwind: "$userDetails",
            },
        ]);
        res.json({ reviews });
    }
    catch (error) {
        console.error("Error fetching reviews with user details:", error);
        res.status(500).send({ error: "Failed to fetch reviews" });
    }
});
exports.default = { blockProvider, unblockProvider, fetchAllReviews };
//# sourceMappingURL=providerActions.js.map