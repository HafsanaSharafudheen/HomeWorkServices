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
exports.AllSamples = void 0;
const booking_1 = __importDefault(require("../../../infrastructure/dbModels/booking"));
const AllSamples = (providerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Ensure providerId is valid
        if (!providerId) {
            throw new Error("Provider ID is missing.");
        }
        const samples = yield booking_1.default.find({ providerId: providerId });
        return samples;
    }
    catch (error) {
        console.error("Error fetching AllSamples:", error);
        throw new Error("Failed to fetch AllSamples.");
    }
});
exports.AllSamples = AllSamples;
//# sourceMappingURL=allWorkSamples.js.map