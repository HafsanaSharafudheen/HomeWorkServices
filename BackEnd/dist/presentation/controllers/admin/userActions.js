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
const admin_1 = require("../../../application/businesslogics/admin");
const blockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, admin_1.updateUserBlockStatus)(req.params.id, true);
        res.status(200).json({ message: "User blocked successfully", user });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
const unblockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, admin_1.updateUserBlockStatus)(req.params.id, false);
        res.status(200).json({ message: "User unblocked successfully", user });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.default = { blockUser, unblockUser };
//# sourceMappingURL=userActions.js.map