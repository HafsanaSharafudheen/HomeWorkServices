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
const provider_1 = require("../../../application/businesslogics/provider");
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingId = req.body.bookingId;
    const status = req.body.status;
    try {
        const provider = yield (0, provider_1.updateBookingStatusByProvider)(bookingId, status);
        return res.status(200).json({ message: "Details of provider found", profile: provider });
    }
    catch (error) {
        console.error("Error fetching profile details:", error);
        res.status(500).json({ message: "Error fetching profile details" });
    }
});
exports.default = updateStatus;
//# sourceMappingURL=bookingStstusUpdate.js.map