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
exports.allDiys = void 0;
const diy_1 = __importDefault(require("../../../infrastructure/dbModels/diy"));
const allDiys = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const diys = yield diy_1.default.aggregate([
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
            {
                $unwind: '$providerDetails',
            },
        ]);
        return diys;
    }
    catch (error) {
        console.error('Error fetching DIYs:', error);
        throw new Error('Failed to fetch DIYs.');
    }
});
exports.allDiys = allDiys;
//# sourceMappingURL=allDIys.js.map