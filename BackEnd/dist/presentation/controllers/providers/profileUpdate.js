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
const serviceProvider_1 = __importDefault(require("../../../infrastructure/dbModels/serviceProvider")); // Mongoose Model for Provider
const ServiceProfileUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profileId = req.user.id;
        if (!profileId) {
            return res.status(400).json({ message: "Profile ID is required" });
        }
        const updatedProfile = yield serviceProvider_1.default.findByIdAndUpdate(profileId, { $set: req.body }, { new: true, });
        // Respond with the updated profile
        res.status(200).json({
            message: "Profile updated successfully",
            profile: updatedProfile,
        });
    }
    catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Error updating profile" });
    }
});
exports.default = ServiceProfileUpdate;
//# sourceMappingURL=profileUpdate.js.map