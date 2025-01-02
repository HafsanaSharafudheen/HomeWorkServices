import { allTestimonials } from "../../../application/businesslogics/user/allTestimonials";

const fetchTestimonials = async (req:Request, res:any) => {
    try {
      const testimonials = await allTestimonials();
      res.status(200).json(testimonials);
    } catch (error) {
      console.error("Error in fetching testimonials:", error);
      res.status(500).json({ message: error});
    }
  };
  export default fetchTestimonials;  