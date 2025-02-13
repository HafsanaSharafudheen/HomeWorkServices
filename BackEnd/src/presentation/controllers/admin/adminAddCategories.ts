import { Request, Response } from "express";
import Category from "../../../infrastructure/dbModels/category";
import { addNewCategory, deleteFromAdmin, fetchAllAdminSideCategories } from "../../../application/businesslogics/admin";
import mongoose from "mongoose";

const addCategory = async (req: Request, res: any): Promise<void> => {
  try {
    const categoryName=req.body.categoryName;
    const categoryImage=  req.file?.path;
    if (!categoryName || !categoryImage) {
        return res
          .status(400)
          .json({ message: "Category name and image are required." });
      }
    const existingCategory = await Category.findOne({ "categoryName":categoryName });
    if (existingCategory) {
      throw new Error("Category already exists");
    }
    console.log('1')
    const category=await addNewCategory(categoryName,categoryImage )
    res.status(200).json({category:category});
  } catch (e) {
    console.error("Error while adding category:", e);
    res.status(500).json({ message: "Failed to while add category." });
  }
};
 const editCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;
    let categoryImage = req.body.categoryImage;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid category ID" });
      return;
    }

    // If file is uploaded, update image
    if (req.file) {
      categoryImage = req.file.path; // Store image path from multer
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { categoryName, categoryImage },
      { new: true }
    );

    if (!updatedCategory) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    res.status(200).json({ message: "Category updated successfully!", updatedCategory });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const fetchAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
      const categories = await fetchAllAdminSideCategories();
  
      // Return the categories as a response
      res.status(200).json({ categories });
    } catch (error: any) {
      console.error("Error fetching categories:", error.message);
      res.status(500).json({ message: "Failed to fetch categories." });
    }
  };
  
  export const deleteCategoriesFromAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
      const  categoryId  = req.body.categoryId; 
  
      console.log(categoryId, "Deleting category with ID");
  
      
  
      const category = await deleteFromAdmin(categoryId);

      
      res.status(200).json({ message: "Category deleted successfully!" });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ error: "Server error" });
    }
  };
  

export default {addCategory,fetchAllCategories,deleteCategoriesFromAdmin,editCategory};
