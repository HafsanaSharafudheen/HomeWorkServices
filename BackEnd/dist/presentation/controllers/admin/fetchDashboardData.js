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
exports.fetchDashboardData = void 0;
const admin_1 = require("../../../application/businesslogics/admin");
const fetchDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, admin_1.getDashboardDetails)();
        res.json(data);
    }
    catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.fetchDashboardData = fetchDashboardData;
//# sourceMappingURL=fetchDashboardData.js.map