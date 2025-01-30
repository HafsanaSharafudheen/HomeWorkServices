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
exports.loginUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../../infrastructure/dbModels/user"));
const serviceProvider_1 = __importDefault(require("../../infrastructure/dbModels/serviceProvider"));
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Attempt to find the user in the User collection
    let user = yield user_1.default.findOne({ email });
    let isProvider = false;
    // If not found, check the Provider collection
    if (!user) {
        user = yield serviceProvider_1.default.findOne({ email });
        isProvider = true;
    }
    // Ensure the user exists
    if (!user) {
        throw new Error("User not found");
    }
    console.log("User found:", user);
    // Compare the password
    const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }
    // Ensure the JWT secret exists
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    const isAdmin = user.isAdmin || false;
    // Generate the token
    const token = jsonwebtoken_1.default.sign({
        id: user._id,
        email: user.email,
        isProvider,
        isAdmin,
        isBlocked: user.isBlocked,
    }, secret, { expiresIn: "1h" });
    console.log("Generated token:", token);
    // Return the token and user details
    return {
        token,
        user: {
            id: user._id.toString(),
            email: user.email,
            fullName: user.fullName,
            isProvider,
            isAdmin,
            isBlocked: user.isBlocked,
        },
    };
});
exports.loginUser = loginUser;
//# sourceMappingURL=loginUser.js.map