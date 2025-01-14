import Bookings from '../dbModels/booking';

export const createPayPalOrder = async (req: any, res: any) => {
  const { bookingId, amount } = req.body;
console.log(req.body,"-----------------")
  if (!bookingId || !amount) {
    return res.status(400).json({ message: "Booking ID and amount are required." });
  }

  try {
    // PayPal API credentials
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const baseURL = "https://sandbox.paypal.com"; // Sandbox URL for testing

    // Get PayPal access token
    const authResponse = await fetch(`${baseURL}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    });

    const authData = await authResponse.json();
    console.log(authData,"authDAta");
    if (!authResponse.ok) {
      throw new Error(authData.error || "Failed to fetch PayPal access token.");
    }

    const accessToken = authData.access_token;

    // Create PayPal order
    const orderResponse = await fetch(`${baseURL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: amount.toFixed(2), // Ensure amount is formatted correctly
            },
          },
        ],
      }),
    });

    const orderData = await orderResponse.json();
    console.log('orderData',orderData)
    if (!orderResponse.ok) {
      throw new Error(orderData.error || "Failed to create PayPal order.");
    }

    res.status(201).json({ orderID: orderData.id });
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    res.status(500).json({ message: "Failed to create PayPal order." });
  }
};

export const capturePayPalOrder = async (req: any, res: any) => {
    const { orderID, bookingId } = req.body;
  
    if (!orderID || !bookingId) {
      return res.status(400).json({ message: "Order ID and Booking ID are required." });
    }
  
    try {
      const clientId = process.env.PAYPAL_CLIENT_ID;
      const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
      const baseURL = "https://api-m.sandbox.paypal.com";
  
      // Get PayPal access token
      const authResponse = await fetch(`${baseURL}/v1/oauth2/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        },
        body: "grant_type=client_credentials",
      });
  
      console.log('authREsponse,',authResponse);
      const authData = await authResponse.json();
      console.log("authData Response:", authData);

      if (!authResponse.ok) {
        throw new Error(authData.error || "Failed to fetch PayPal access token.");
      }
  
      const accessToken = authData.access_token;
  
      // Capture payment
      const captureResponse = await fetch(`${baseURL}/v2/checkout/orders/${orderID}/capture`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
  
      const captureData = await captureResponse.json();
      if (!captureResponse.ok) {
        throw new Error(captureData.error || "Failed to capture PayPal order.");
      }
  
      // Mark payment as complete in the database
      await Bookings.findByIdAndUpdate(bookingId, { "payment.status": "completed" });
  
      res.status(200).json({ message: "Payment captured successfully.", details: captureData });
    } catch (error) {
      console.error("Error capturing PayPal order:", error);
      res.status(500).json({ message: "Failed to capture PayPal order." });
    }
  };
  


import client from "./paypalClient";
import paypal from '@paypal/checkout-server-sdk';

  export const createPayPalOrder2 = async (req: any, res: any) => {

    const { bookingId, amount } = req.body;
    console.log(req.body,"-----------------")
      if (!bookingId || !amount) {
        return res.status(400).json({ message: "Booking ID and amount are required." });
      }


    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value:amount,
          },
        },
      ]});

      try {
        const order = await client.execute(request);
        res.json({ id: order.result.id });
      } catch (err) {
        res.status(500).send(err);
      }
  }


  export const capturePayPalOrder2 = async (req: any, res: any) => {
    const { orderId, bookingId } = req.body;
  console.log(req.body,"capture")
    if (!orderId || !bookingId) {
      return res.status(400).json({ message: "Order ID and Booking ID are required." });
    }
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    //request.requestBody({});
  
    try {
      const capture = await client.execute(request);

      await Bookings.findByIdAndUpdate(bookingId, { "payment.status": "completed" });
      res.json(capture.result);
    } catch (err) {
      res.status(500).send(err);
    }
}