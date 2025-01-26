import Razorpay from "razorpay";

interface BankDetails {
  name: string; // Account holder's name
  accountNumber: string; // Beneficiary's bank account number
  IFSCCode: string; // IFSC code of the beneficiary's bank
}

interface CreateContactParams {
  name: string;
  email: string;
  contact: string; // Mobile number
}

class RazorpayService {
  private razorpay: Razorpay;

  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "",
    });
  }

  // Create a new contact
  async createContact(params: CreateContactParams): Promise<string> {
    try {
      const contact = await this.razorpay.contacts.create({
        name: params.name,
        email: params.email,
        contact: params.contact,
        type: "customer",
      });
      
      return contact.id; // Return the contact ID
    } catch (error) {
      console.error("Error creating contact:", error);
      throw new Error("Failed to create contact");
    }
  }

  // Create a fund account for the contact
  async createFundAccount(
    contactId: string,
    bankDetails: BankDetails
  ): Promise<string> {
    try {
      const fundAccount = await (this.razorpay as any).fund_account.create({
        contact_id: contactId,
        account_type: "bank_account",
        bank_account: {
          name: bankDetails.name,
          ifsc: bankDetails.IFSCCode,
          account_number: bankDetails.accountNumber,
        },
      });
      return fundAccount.id; // Return the fund account ID
    } catch (error) {
      console.error("Error creating fund account:", error);
      throw new Error("Failed to create fund account");
    }
  }

  // Make a payout to the fund account
  async makePayout(
    fundAccountId: string,
    amount: number,
    referenceId: string
  ): Promise<void> {
    try {
      await (this.razorpay as any).payouts.create({
        account_number: "your_virtual_account_number", // Your Razorpay virtual account number
        fund_account_id: fundAccountId,
        amount: amount * 100, // Amount in paise
        currency: "INR",
        mode: "IMPS", // or NEFT/RTGS
        purpose: "payout",
        reference_id: referenceId,
      });
      console.log("Payout successful");
    } catch (error) {
      console.error("Error creating payout:", error);
      throw new Error("Failed to make payout");
    }
  }
}

export default new RazorpayService();
