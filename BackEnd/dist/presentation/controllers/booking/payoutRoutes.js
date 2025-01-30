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
exports.razorpayPaymentToBankAccount = void 0;
const express_1 = __importDefault(require("express"));
const razorpayService_1 = __importDefault(require("../../../infrastructure/services/razorpayService"));
const router = express_1.default.Router();
const razorpayPaymentToBankAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { booking } = req.body.booking;
        const { name, email, contact, accountNumber, IFSCCode, amount } = booking;
        ////////////// GET Worker bank account details here
        // Step 1: Create a contact
        const contactId = yield razorpayService_1.default.createContact({ name, email, contact });
        // Step 2: Create a fund account
        const fundAccountId = yield razorpayService_1.default.createFundAccount(contactId, {
            name,
            accountNumber,
            IFSCCode,
        });
        // Step 3: Make a payout
        const referenceId = `txn_${Date.now()}`;
        yield razorpayService_1.default.makePayout(fundAccountId, amount, referenceId);
        ////////////// SAVE Worker bank account payment status in bookin db
        res.status(200).json({ message: "Payout successful", referenceId });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.razorpayPaymentToBankAccount = razorpayPaymentToBankAccount;
exports.default = router;
//# sourceMappingURL=payoutRoutes.js.map