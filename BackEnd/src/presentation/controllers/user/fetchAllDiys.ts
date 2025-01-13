import { allDiys } from "../../../application/businesslogics/user/allDIys";

const fetchAllDiys = async (req:Request, res:any) => {
    try {
      const diys = await allDiys();
      console.log(diys,'....................')
      res.status(200).json(diys);
    } catch (error) {
      console.error("Error in fetching diys:", error);
      res.status(500).json({ message: error});
    }
  };
  export default fetchAllDiys;  