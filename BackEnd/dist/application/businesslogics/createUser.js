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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userRepository_1 = __importDefault(require("../../application/repositories/userRepository"));
const execute = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, phone, address, password, whatsappNumber } = userData;
    // Validate required fields
    if (!fullName || !email || !password || !whatsappNumber || !address) {
        throw new Error("Missing required fields: fullName, email, password, whatsappNumber, and address are mandatory");
    }
    // Validate address fields
    if (!address.city || !address.district || !address.pin) {
        throw new Error("Address must include city, district, and pin.");
    }
    // Check if the email already exists
    const existingUser = yield userRepository_1.default.findUserByEmail(email);
    if (existingUser) {
        throw new Error("Email already exists. Please use a different email.");
    }
    // Check if the WhatsApp number already exists
    const existingUserByWhatsappNumber = yield userRepository_1.default.findUserByWhatsappNumber(whatsappNumber);
    if (existingUserByWhatsappNumber) {
        throw new Error("WhatsApp number already exists. Please use a different WhatsApp number.");
    }
    // Hash the user's password
    const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
        return bcryptjs_1.default.hash(password, 10);
    });
    const hashedPassword = yield hashPassword(password);
    // Save the user using the repository
    const savedUser = yield userRepository_1.default.saveUser({
        fullName,
        email,
        phone,
        address,
        password: hashedPassword,
        whatsappNumber,
        isAdmin: false,
    });
    return savedUser;
});
exports.default = { execute };
//# sourceMappingURL=createUser.js.map