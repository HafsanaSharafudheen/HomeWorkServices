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
exports.uploadProfilePictureOfUser = exports.UserProfileUpdate = void 0;
const updateUserProfile_1 = require("../../../application/businesslogics/user/updateUserProfile");
const profilePicture_1 = require("../../../application/businesslogics/profilePicture");
const UserProfileUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const updatedProfile = yield (0, updateUserProfile_1.updateUserProfile)(userId, req.body);
        res.status(200).json({
            message: "Profile updated successfully",
            profile: updatedProfile,
        });
    }
    catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: error || "Error updating profile" });
    }
});
exports.UserProfileUpdate = UserProfileUpdate;
const uploadProfilePictureOfUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const entityId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const entityType = req.body.entityType;
        if (!req.file) {
            res.status(400).send({ error: 'No file uploaded' });
            return;
        }
        console.log(req.file, 'requestfile.....1');
        const filePath = `/uploads/${req.file.filename}`;
        console.log(filePath, 'filePaaaath2');
        const updatedEntity = yield (0, profilePicture_1.updateProfilePicture)(entityType, entityId, filePath);
        if (!updatedEntity) {
            res.status(404).send({ error: `${entityType} not found` });
            return;
        }
        res.status(200).send({
            message: 'Profile picture uploaded successfully',
            filePath,
        });
    }
    catch (error) {
        console.error('Error uploading profile picture:', error);
        res.status(500).send({ error: 'An error occurred while uploading the profile picture' });
    }
});
exports.uploadProfilePictureOfUser = uploadProfilePictureOfUser;
exports.default = { UserProfileUpdate: exports.UserProfileUpdate, uploadProfilePictureOfUser: exports.uploadProfilePictureOfUser };
//# sourceMappingURL=userProfileUpdate.js.map