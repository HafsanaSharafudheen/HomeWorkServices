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
exports.fetchAdminDetails = void 0;
const admin_1 = require("../../../application/businesslogics/admin");
const fetchAdminDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const adminId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        // Validate adminId
        if (!adminId) {
            return res.status(400).json({ error: "Admin ID is not provided" });
        }
        // Fetch admin details
        const adminDetails = yield (0, admin_1.fetchAdminProfileDetails)(adminId);
        // If admin details not found
        if (!adminDetails) {
            return res.status(404).json({ error: "Admin not found" });
        }
        // Return the admin details
        return res.status(200).json(adminDetails);
    }
    catch (error) {
        console.error("Error fetching admin details:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.fetchAdminDetails = fetchAdminDetails;
//# sourceMappingURL=fetchProfile.js.map