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
const razorpay_1 = __importDefault(require("razorpay"));
class RazorpayService {
    constructor() {
        this.razorpay = new razorpay_1.default({
            key_id: process.env.RAZORPAY_KEY_ID || "",
            key_secret: process.env.RAZORPAY_KEY_SECRET || "",
        });
    }
    // Create a new contact
    createContact(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield this.razorpay.contacts.create({
                    name: params.name,
                    email: params.email,
                    contact: params.contact,
                    type: "customer",
                });
                return contact.id;
            }
            catch (error) {
                console.error("Error creating contact:", error);
                throw new Error("Failed to create contact");
            }
        });
    }
    // Create a fund account for the contact
    createFundAccount(contactId, bankDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fundAccount = yield this.razorpay.fund_account.create({
                    contact_id: contactId,
                    account_type: "bank_account",
                    bank_account: {
                        name: bankDetails.name,
                        ifsc: bankDetails.IFSCCode,
                        account_number: bankDetails.accountNumber,
                    },
                });
                return fundAccount.id;
            }
            catch (error) {
                console.error("Error creating fund account:", error);
                throw new Error("Failed to create fund account");
            }
        });
    }
    // Make a payout to the fund account
    makePayout(fundAccountId, amount, referenceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.razorpay.payouts.create({
                    account_number: "1234567890", // Test Mode account number
                    fund_account_id: fundAccountId,
                    amount: amount * 100, // Convert amount to paise
                    currency: "INR",
                    mode: "IMPS", // or NEFT/RTGS
                    purpose: "payout",
                    reference_id: referenceId,
                });
                console.log("Payout successful");
            }
            catch (error) {
                console.error("Error creating payout:", error);
                throw new Error("Failed to make payout");
            }
        });
    }
}
exports.default = new RazorpayService();
//# sourceMappingURL=razorpayService.js.map