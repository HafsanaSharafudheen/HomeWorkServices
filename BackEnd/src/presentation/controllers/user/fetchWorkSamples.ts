import { AllSamples } from "../../../application/businesslogics/user/allWorkSamples";

const fetchAllWorkSamples = async (req:any, res:any) => {
  try {
    const providerId = req.params.providerId;

    if (!providerId) {
      return res.status(400).json({ message: "Provider ID is required." });
    }

    const samples = await AllSamples(providerId);

    if (!samples || samples.length === 0) {
      return res.status(404).json({ message: "No work samples found for this provider." });
    }

    res.status(200).json({ samples });
  } catch (error) {
    console.error("Error fetching samples:", error);
    res.status(500).json({ message: "Failed to fetch work samples." });
  }
};

export default fetchAllWorkSamples;
