import { testimonialRepository } from '../../repositories/testimonialRepository';

export const allTestimonials = async () => {
    try {
      const testimonials = await testimonialRepository();
      if (!testimonials || testimonials.length === 0) {
        throw new Error("Testimonials not found");
      }
      return testimonials;
    } catch (error) {
      console.error("Error in fetching testimonials use case:", error);
      throw error;
    }
  };
