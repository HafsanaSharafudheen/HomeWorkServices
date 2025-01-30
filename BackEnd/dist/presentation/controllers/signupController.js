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
const createUser_1 = __importDefault(require("../../application/businesslogics/createUser"));
const emailService_1 = __importDefault(require("../../infrastructure/services/emailService"));
const handleSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield createUser_1.default.execute(req.body);
        const emailContent = `
      <h1>Welcome to HomeWorks</h1>
      <p>Dear ${result.fullName},</p>
      <p>Thank you for joining us! We're thrilled to have you on board.</p>
      <p>Explore our features and feel free to reach out if you need any help.</p>
      <p>Best regards,</p>
      <p>HomeWorks Team</p>
    `;
        yield (0, emailService_1.default)(result.email, "Welcome to HomeWorks", emailContent);
        res.status(201).json({
            message: "Thank you for signing up! A welcome email has been sent to your email address.",
            user: result,
        });
    }
    catch (error) {
        if (error.message === "Email already exists. Please use a different email.") {
            res.status(400).json({ message: error.message });
        }
        else if (error.message === "WhatsApp number already exists. Please use a different WhatsApp number.") {
            res.status(400).json({ message: error.message });
        }
        else {
            console.error("Unexpected error:", error); // Log the error for debugging
            res.status(500).json({ message: "An unexpected error occurred" });
        }
    }
});
exports.default = { handleSignup };
//# sourceMappingURL=signupController.js.map