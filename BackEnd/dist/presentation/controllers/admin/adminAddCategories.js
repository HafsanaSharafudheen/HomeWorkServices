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
exports.deleteCategoriesFromAdmin = exports.fetchAllCategories = void 0;
const category_1 = __importDefault(require("../../../infrastructure/dbModels/category"));
const admin_1 = require("../../../application/businesslogics/admin");
const mongoose_1 = __importDefault(require("mongoose"));
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const categoryName = req.body.categoryName;
        const categoryImage = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        if (!categoryName || !categoryImage) {
            return res
                .status(400)
                .json({ message: "Category name and image are required." });
        }
        const existingCategory = yield category_1.default.findOne({ "categoryName": categoryName });
        if (existingCategory) {
            throw new Error("Category already exists");
        }
        console.log('1');
        const category = yield (0, admin_1.addNewCategory)(categoryName, categoryImage);
        res.status(200).json({ category: category });
    }
    catch (e) {
        console.error("Error while adding category:", e);
        res.status(500).json({ message: "Failed to while add category." });
    }
});
const editCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { categoryName } = req.body;
        let categoryImage = req.body.categoryImage;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ error: "Invalid category ID" });
            return;
        }
        // If file is uploaded, update image
        if (req.file) {
            categoryImage = req.file.path; // Store image path from multer
        }
        const updatedCategory = yield category_1.default.findByIdAndUpdate(id, { categoryName, categoryImage }, { new: true });
        if (!updatedCategory) {
            res.status(404).json({ error: "Category not found" });
            return;
        }
        res.status(200).json({ message: "Category updated successfully!", updatedCategory });
    }
    catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ error: "Server error" });
    }
});
const fetchAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, admin_1.fetchAllAdminSideCategories)();
        // Return the categories as a response
        res.status(200).json({ categories });
    }
    catch (error) {
        console.error("Error fetching categories:", error.message);
        res.status(500).json({ message: "Failed to fetch categories." });
    }
});
exports.fetchAllCategories = fetchAllCategories;
const deleteCategoriesFromAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.body.categoryId;
        console.log(categoryId, "Deleting category with ID");
        const category = yield (0, admin_1.deleteFromAdmin)(categoryId);
        res.status(200).json({ message: "Category deleted successfully!" });
    }
    catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ error: "Server error" });
    }
});
exports.deleteCategoriesFromAdmin = deleteCategoriesFromAdmin;
exports.default = { addCategory, fetchAllCategories: exports.fetchAllCategories, deleteCategoriesFromAdmin: exports.deleteCategoriesFromAdmin, editCategory };
//# sourceMappingURL=adminAddCategories.js.map