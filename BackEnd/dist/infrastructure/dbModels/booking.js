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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bookingSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    providerId: { type: String, required: true },
    selectedDate: { type: Date, required: true },
    selectedTime: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ["pending", "rejected", "accepted", "completed", "cancelled"],
        default: "pending",
    },
    payment: {
        method: { type: String, required: true },
        amount: { type: Number, required: true },
        releasedDate: { type: Date },
        status: { type: String, required: true },
        time: { type: Date, default: null },
    },
    workingUpdates: [
        {
            title: { type: String, required: true },
            description: { type: String, required: true },
            photos: { type: [String], default: [] },
            videos: { type: [String], default: [] },
            time: { type: Date, default: Date.now },
        },
    ],
});
exports.default = mongoose_1.default.model("Booking", bookingSchema);
//# sourceMappingURL=booking.js.map