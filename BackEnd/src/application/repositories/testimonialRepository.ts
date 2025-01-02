import Review from "../../infrastructure/dbModels/review";

export const testimonialRepository = async () => {
    try {
    
        const testimonilas = await Review.aggregate([
            {
              $addFields: {
                userId: { $toObjectId: "$userId" } // Convert userId to ObjectId
              }
            },
            {
              $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userDetails',
              }
            },
          ]);
      
          return testimonilas;  
          } catch (error) {
      console.error("Error fetching testimonials from database:", error);
      throw new Error("Error fetching testimonials");
    }
  };