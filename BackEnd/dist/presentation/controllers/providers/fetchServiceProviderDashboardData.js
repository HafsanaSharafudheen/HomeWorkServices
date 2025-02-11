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
exports.fetchDashboardDataWithDate = exports.fetchServiceProviderDashboardData = void 0;
const provider_1 = require("../../../application/businesslogics/provider");
const fetchServiceProviderDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const providerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Ensure `req.user.id` exists
    if (!providerId) {
        return res.status(400).json({ message: "Provider ID is required" });
    }
    try {
        const data = yield (0, provider_1.getDashboardData)(providerId);
        res.status(200).json(data);
    }
    catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.fetchServiceProviderDashboardData = fetchServiceProviderDashboardData;
const fetchDashboardDataWithDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { startDate, endDate } = req.query;
    const providerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    console.log(req.query, providerId, "1");
    if (!startDate || !endDate || !providerId) {
        return res.status(400).json({ message: "Start date and end date are required" });
    }
    try {
        const data = yield (0, provider_1.fetchDataWithDate)(new Date(startDate), new Date(endDate), providerId);
        res.status(200).json(data);
    }
    catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
});
exports.fetchDashboardDataWithDate = fetchDashboardDataWithDate;
//# sourceMappingURL=fetchServiceProviderDashboardData.js.map