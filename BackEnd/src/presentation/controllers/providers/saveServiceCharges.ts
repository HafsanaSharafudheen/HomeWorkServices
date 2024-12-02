import Provider from "../../../infrastructure/dbModels/serviceProvider";
import provide from '../../../application/businesslogics/provider'
const SaveServiceCharges = async (req: any, res: any): Promise<void> => {
  try {
    const charges = [
      { type: "Basic Payment", amount: Number(req.body.basicPayment) },
      { type: "Emergency Payment", amount: Number(req.body.emergencyPayment) },
      { type: "Onsite Charge", amount: Number(req.body.onsiteCharge) },
      { type: "Advanced Charge", amount: Number(req.body.advancedCharge) },
    ];

    const provider = await provide.updateProviderServiceCharges(req.user.id,charges);

  
    console.log(provider, "provider", req.body, "requestbody");

    if (!provider) {
      return res.status(404).json({ message: "No service provider found" });
    }

    const { basicPayment, emergencyPayment, onsiteCharge, advancedCharge } = req.body;

    if (!basicPayment || !emergencyPayment || !onsiteCharge || !advancedCharge) {
      return res.status(400).json({ message: "Invalid service charges provided" });
    }

    provider.serviceCharges = [
      { type: "Basic Payment", amount: Number(basicPayment) },
      { type: "Emergency Payment", amount: Number(emergencyPayment) },
      { type: "Onsite Charge", amount: Number(onsiteCharge) },
      { type: "Advanced Charge", amount: Number(advancedCharge) },
    ];

    await provider.save();

    return res.status(200).json({
      message: "Service charges updated successfully",
      serviceCharges: provider.serviceCharges,
    });
  } catch (error) {
    console.error("Error saving service charges:", error);
    res.status(500).json({ message: "Error saving service charges" });
  }
};

export default SaveServiceCharges;
