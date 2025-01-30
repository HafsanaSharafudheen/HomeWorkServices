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
exports.updateProfilePicture = void 0;
const user_1 = __importDefault(require("../../infrastructure/dbModels/user"));
const serviceProvider_1 = __importDefault(require("../../infrastructure/dbModels/serviceProvider"));
const updateProfilePicture = (entityType, entityId, filePath) => __awaiter(void 0, void 0, void 0, function* () {
    let updatedEntity;
    if (entityType === 'user') {
        updatedEntity = yield user_1.default.findByIdAndUpdate(entityId, { profilePicture: filePath }, { new: true });
    }
    else if (entityType === 'provider') {
        updatedEntity = yield serviceProvider_1.default.findByIdAndUpdate(entityId, { profilePicture: filePath }, { new: true });
    }
    return updatedEntity;
});
exports.updateProfilePicture = updateProfilePicture;
//# sourceMappingURL=profilePicture.js.map