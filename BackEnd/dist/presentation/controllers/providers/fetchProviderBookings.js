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
exports.fetchBookingsDataforProvider = void 0;
const provider_1 = require("../../../application/businesslogics/provider");
const fetchBookingsDataforProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const providerId = req.query.providerId;
    if (!providerId) {
        res.status(400).json({ message: "Provider ID is required." });
        return;
    }
    try {
        const bookings = yield (0, provider_1.findAllBookingsData)(providerId);
        res.status(200).json({ bookings });
    }
    catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Failed to fetch bookings." });
    }
});
exports.fetchBookingsDataforProvider = fetchBookingsDataforProvider;
exports.default = exports.fetchBookingsDataforProvider;
//# sourceMappingURL=fetchProviderBookings.js.map