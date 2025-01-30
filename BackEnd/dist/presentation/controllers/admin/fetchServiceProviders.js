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
const admin_1 = __importDefault(require("../../../application/businesslogics/admin"));
const fetchProviders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var providers = yield admin_1.default.findAllProviders();
        res.status(200).json({ providers: providers });
    }
    catch (e) {
        console.error("Error fetching providers:", e);
        res.status(500).json({ message: "Failed to fetch providers." });
    }
});
exports.default = fetchProviders;
//# sourceMappingURL=fetchServiceProviders.js.map