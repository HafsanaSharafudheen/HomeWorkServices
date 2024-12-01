import { Request, Response } from "express";
import Provider from "../../../Entities/serviceProvider";

const SaveServiceCharges = async (req: any, res: any): Promise<void> => {
  try {
    const provider = await Provider.findById(req.user.id);
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
