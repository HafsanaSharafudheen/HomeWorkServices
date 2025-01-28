import { useState, useEffect } from "react";
import { Category } from "../../../types/category";
import axios from "../../../utilities/axios";


const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/AdminCategories");
      setCategories(response.data.categories);
      setError(null);
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      setError("Failed to fetch categories. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error, fetchCategories };
};

export default useCategories;
