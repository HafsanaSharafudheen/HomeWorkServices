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
exports.getUserDetails = void 0;
const fetchUserDetails_1 = require("../../../application/businesslogics/user/fetchUserDetails");
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const userDetails = yield (0, fetchUserDetails_1.fetchUserDetails)(userId);
        res.status(200).json({ user: userDetails });
    }
    catch (error) {
        console.error('Error in getUserDetails:', error);
        res.status(500).json({ message: error });
    }
});
exports.getUserDetails = getUserDetails;
//# sourceMappingURL=fetchUserDetails.js.map