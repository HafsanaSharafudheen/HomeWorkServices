import axios from "../../../../utilities/axios";

export const useProviderReviews = () => {
  const fetchReviews = async (providerId: string) => {
    try {
      const response = await axios.get(`/providersReviews/${providerId}`);
      return response.data.reviews;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return [];
    }
  };

  return { fetchReviews };
};
