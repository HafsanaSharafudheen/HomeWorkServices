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
exports.createBooking = void 0;
const bookingService_1 = __importDefault(require("../../../application/businesslogics/bookingService"));
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    let { providerId, selectedDate, selectedTime, amount } = req.body;
    if (!providerId || !selectedDate || !selectedTime || !amount) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    try {
        selectedDate = new Date(selectedDate);
        selectedDate.setUTCHours(0, 0, 0, 0);
        const booking = yield bookingService_1.default.execute({
            userId,
            providerId,
            selectedDate,
            selectedTime,
            payment: {
                amount: amount,
                method: "pending",
                status: "pending",
                time: null,
            },
        });
        res.status(201).json({ success: true, booking });
    }
    catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ success: false, message: "Failed to create booking." });
    }
});
exports.createBooking = createBooking;
//# sourceMappingURL=createBooking.js.map