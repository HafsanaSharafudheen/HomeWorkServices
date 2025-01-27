import { useState, useEffect } from "react";
import { Provider } from "../../../ServiceProvider/types/provider.ts";
import axios from "../../../utilities/axios.ts";


export const useServiceProviders = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get("/fetchProviders");
        setProviders(response.data.providers);
      } catch (error) {
        setError("Failed to fetch providers");
        console.error("Error fetching providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const updateProvider = (updatedProvider: Provider) => {
    setProviders((prevProviders) =>
      prevProviders.map((provider) =>
        provider._id === updatedProvider._id ? updatedProvider : provider
      )
    );
  };

  return { providers, loading, error, updateProvider };
};
