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
exports.findAllDiysByProvider = exports.createNewDIY = void 0;
const provider_1 = require("../../../application/businesslogics/provider");
const createNewDIY = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const diyData = {
            providerId: req.user.id,
            ditTitle: req.body.ditTitle,
            purpose: req.body.purpose,
            materialsRequired: JSON.parse(req.body.materialsRequired || '[]'),
            steps: JSON.parse(req.body.steps || '[]'),
            category: req.body.category,
            safetyTips: JSON.parse(req.body.safetyTips || '[]'),
            additionalNotes: req.body.additionalNotes,
            photos: ((_a = req.files) === null || _a === void 0 ? void 0 : _a.photos)
                ? req.files.photos.map((file) => file.path)
                : [],
            vedios: ((_b = req.files) === null || _b === void 0 ? void 0 : _b.videos)
                ? req.files.videos.map((file) => file.path)
                : [],
        };
        console.log(diyData, "..............diyData");
        const result = yield (0, provider_1.createDIYService)(diyData);
        res.status(201).json({ message: "DIY Tip created successfully!", result });
    }
    catch (error) {
        console.error("Error creating DIY Tip:", error);
        res.status(500).json({ error: "Failed to create DIY Tip" });
    }
});
exports.createNewDIY = createNewDIY;
const findAllDiysByProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { providerId } = req.query;
        if (!providerId || typeof providerId !== "string") {
            res.status(400).json({ error: "Provider ID is required and must be a string" });
            return;
        }
        const result = yield (0, provider_1.searchDIYS)(providerId);
        res.status(200).json({ message: "DIYs fetched successfully", diy: result });
    }
    catch (error) {
        console.error("Error fetching DIYs:", error);
        res.status(500).json({ error: "Failed to fetch DIYs" });
    }
});
exports.findAllDiysByProvider = findAllDiysByProvider;
//# sourceMappingURL=createNewDIY.js.map