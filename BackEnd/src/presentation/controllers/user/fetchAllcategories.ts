import { allCategories } from "../../../application/businesslogics/user/allCategories";

const fetchAllcategories = async (req:Request, res:any) => {
    try {
      const categories = await allCategories();
      console.log(categories,'....................')
      res.status(200).json(categories);
    } catch (error) {
      console.error("Error in fetching categories:", error);
      res.status(500).json({ message: error});
    }
  };
  export default fetchAllcategories;  