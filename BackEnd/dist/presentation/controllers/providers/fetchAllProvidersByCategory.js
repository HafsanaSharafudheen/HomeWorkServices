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
const provider_1 = __importDefault(require("../../../application/businesslogics/provider"));
const fetchAllProvidersByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { serviceCategory } = req.query;
        console.log(req.query, "request query from the providers details");
        if (!serviceCategory) {
            return res.status(400).json({ message: "Service category is required" });
        }
        const providers = yield provider_1.default.findAllProvidersByCategory(serviceCategory);
        return res.status(200).json({ message: "Details of provider found", providers: providers });
    }
    catch (error) {
        console.error("Error fetching profile details:", error);
        res.status(500).json({ message: "Error fetching profile details" });
    }
});
exports.default = fetchAllProvidersByCategory;
//# sourceMappingURL=fetchAllProvidersByCategory.js.map