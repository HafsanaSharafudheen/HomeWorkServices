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
const providerRepository_1 = __importDefault(require("../repositories/providerRepository"));
const execute = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate required fields
    if (!userData.fullName || !userData.email || !userData.password || !userData.whatsappNumber) {
        throw new Error("Missing required fields");
    }
    const existingUser = yield providerRepository_1.default.findProviderByWhatsappNumber(userData.whatsappNumber);
    if (existingUser) {
        throw new Error("WhatsApp number already exists. Please use a different WhatsApp number.");
    }
    // Hash the password
    const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
        return bcryptjs_1.default.hash(password, 10);
    });
    const hashedPassword = yield hashPassword(userData.password);
    // Save user data using the repository
    return providerRepository_1.default.saveUser({
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        password: hashedPassword,
        contactNumber: userData.contactNumber,
        serviceCategory: userData.serviceCategory,
        yearsOfExperience: userData.yearsOfExperience,
        workingHours: userData.workingHours,
        accountNumber: userData.accountNumber,
        IFSCCode: userData.IFSCCode,
        certifications: userData.certifications,
        languages: userData.languages,
        education: userData.education,
        serviceCharge: userData.serviceCharge,
        whatsappNumber: userData.whatsappNumber,
    });
});
exports.default = { execute };
//# sourceMappingURL=createProvider.js.map