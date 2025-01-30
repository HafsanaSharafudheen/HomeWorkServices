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
Object.defineProperty(exports, "__esModule", { value: true });
const allWorkSamples_1 = require("../../../application/businesslogics/user/allWorkSamples");
const fetchAllWorkSamples = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const providerId = req.params.providerId;
        if (!providerId) {
            return res.status(400).json({ message: "Provider ID is required." });
        }
        const samples = yield (0, allWorkSamples_1.AllSamples)(providerId);
        if (!samples || samples.length === 0) {
            return res.status(404).json({ message: "No work samples found for this provider." });
        }
        res.status(200).json({ samples });
    }
    catch (error) {
        console.error("Error fetching samples:", error);
        res.status(500).json({ message: "Failed to fetch work samples." });
    }
});
exports.default = fetchAllWorkSamples;
//# sourceMappingURL=fetchWorkSamples.js.map