import { Request, Response } from "express";
import Category from "../../../infrastructure/dbModels/category";
import { addNewCategory, fetchAllAdminSideCategories } from "../../../application/businesslogics/admin";

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

export const fetchAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
      // Fetch all categories
      const categories = await fetchAllAdminSideCategories();
  
      // Return the categories as a response
      res.status(200).json({ categories });
    } catch (error: any) {
      console.error("Error fetching categories:", error.message);
      res.status(500).json({ message: "Failed to fetch categories." });
    }
  };

export default {addCategory,fetchAllCategories};
