import { useState, useEffect } from "react";
import axios from "../../../utilities/axios";
import { Category } from "../../../types/category";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/fetchCategories");
        if (response.data && Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        setError("Failed to fetch categories");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
