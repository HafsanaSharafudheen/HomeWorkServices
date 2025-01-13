import category from "../../../infrastructure/dbModels/category";

export const allCategories = async () => {
  try {
    const categories = await category.find();
    return categories; 
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories."); 
  }
};
