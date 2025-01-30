"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.resetPassword = void 0;
const loginUser_1 = require("../../application/businesslogics/loginUser");
const jwtCookie_1 = require("../Security/jwtCookie");
const user_1 = __importDefault(require("../../infrastructure/dbModels/user"));
const serviceProvider_1 = __importDefault(require("../../infrastructure/dbModels/serviceProvider"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto = __importStar(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const handleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "email and password are required." });
            return;
        }
        const userData = yield (0, loginUser_1.loginUser)(email, password);
        console.log(userData, "userdata form the logincontroller");
        (0, jwtCookie_1.setJwtCookie)(userData.user.id, res);
        res.status(200).json(userData);
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
});
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    console.log('1');
    try {
        let user = yield user_1.default.findOne({ email });
        let isProvider = false;
        if (!user) {
            user = yield serviceProvider_1.default.findOne({ email });
            isProvider = true;
        }
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        console.log('2');
        const token = crypto.randomBytes(32).toString("hex");
        console.log(token);
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        console.log('3');
        yield user.save();
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
        const transporter = nodemailer_1.default.createTransport({
            //service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            //port:587,
            secure: true,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
            logger: true, // Enable logging
            debug: true, // Show debug output
        });
        console.log(transporter, "4");
        console.log("Frontend URL:", process.env.FRONTEND_URL);
        const mailOptions = {
            to: email,
            from: process.env.SMTP_USERNAME,
            subject: "Password Reset",
            html: `
      <p>You requested a password reset.</p>
      <p>Click <a href="${resetUrl}" target="_blank">here</a> to reset your password.</p>
      <p>The link is valid for 1 hour.</p>
    `,
        };
        console.log(mailOptions, "5");
        yield transporter.sendMail(mailOptions);
        console.log("Email sent successfully.");
        res.status(200).json({ message: "Password reset link sent to your email." });
    }
    catch (err) {
        res.status(200).json({ message: "Password reset link sent to your email." });
        res.status(500).json({ error: "Internal server error." });
    }
});
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const user = yield user_1.default.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({ error: "Invalid or expired token." });
        }
        user.password = yield bcryptjs_1.default.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        yield user.save();
        res.status(200).json({ message: "Password has been reset successfully." });
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error." });
    }
});
exports.resetPassword = resetPassword;
exports.default = { handleLogin, forgotPassword, resetPassword: exports.resetPassword };
//# sourceMappingURL=loginController.js.map