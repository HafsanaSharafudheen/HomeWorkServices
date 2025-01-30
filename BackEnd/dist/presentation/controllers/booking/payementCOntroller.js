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
exports.razorpayPaymentToBankAccount = exports.razorpayBooking = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const booking_1 = __importDefault(require("../../../infrastructure/dbModels/booking"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const razorpayBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, currency, bookingId } = req.body;
    if (!amount || !currency || !bookingId) {
        return res.status(400).json({ success: false, message: "Invalid input parameters." });
    }
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
        throw new Error("Razorpay key ID or secret is missing from the environment variables.");
    }
    const razorpay = new razorpay_1.default({
        key_id: keyId,
        key_secret: keySecret,
    });
    try {
        const razorpay = new razorpay_1.default({
            key_id: keyId,
            key_secret: keySecret,
        });
        const options = {
            amount: amount * 100,
            currency,
            receipt: `receipt_${bookingId}`,
        };
        const order = yield razorpay.orders.create(options);
        const booking = yield booking_1.default.findByIdAndUpdate(bookingId, {
            $set: {
                "payment.status": "completed",
                "payment.method": "online",
                "payment.time": new Date()
            },
        }, { new: true });
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found." });
        }
        res.status(200).json({
            success: true,
            order,
            booking,
        });
    }
    catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ success: false, message: "Failed to create Razorpay order." });
    }
});
exports.razorpayBooking = razorpayBooking;
const razorpayPaymentToBankAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { booking } = req.body;
        // Find the booking by ID
        const existingBooking = yield booking_1.default.findById(booking._id);
        if (!existingBooking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        if (existingBooking.payment.status !== "completed") {
            return res
                .status(400)
                .json({ error: "Payment status is not eligible for transfer" });
        }
        // Update the releasedDate to the current date
        const currentDate = new Date();
        existingBooking.payment.releasedDate = currentDate;
        // Save the updated booking back to the database
        yield existingBooking.save();
        console.log("Updated Booking:", existingBooking);
        res.status(200).json({ message: "Payment transferred", booking: existingBooking });
    }
    catch (error) {
        console.error("Error updating payment release date:", error);
        res.status(500).json({ error: "Failed to update payment release date" });
    }
});
exports.razorpayPaymentToBankAccount = razorpayPaymentToBankAccount;
//# sourceMappingURL=payementCOntroller.js.map