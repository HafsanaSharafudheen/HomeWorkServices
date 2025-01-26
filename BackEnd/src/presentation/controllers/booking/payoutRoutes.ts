import express from "express";
import RazorpayService from "../../../infrastructure/services/razorpayService";

const router = express.Router();

export const razorpayPaymentToBankAccount = async (req: any, res: any) => {
    try {
        //const { booking } = req.body;
        const { name, email, contact, accountNumber, IFSCCode, amount } = req.body;

        ////////////// GET Worker bank account details here
    // Step 1: Create a contact
    const contactId = await RazorpayService.createContact({ name, email, contact });

    // Step 2: Create a fund account
    const fundAccountId = await RazorpayService.createFundAccount(contactId, {
      name,
      accountNumber,
      IFSCCode,
    });
    // Step 3: Make a payout
    const referenceId = `txn_${Date.now()}`;
    await RazorpayService.makePayout(fundAccountId, amount, referenceId);
////////////// SAVE Worker bank account payment status in bookin db
    res.status(200).json({ message: "Payout successful", referenceId });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
}

export default router;
