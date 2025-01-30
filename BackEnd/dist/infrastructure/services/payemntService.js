"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.capturePayPalOrder2 = exports.createPayPalOrder2 = exports.capturePayPalOrder = exports.createPayPalOrder = void 0;
const booking_1 = __importDefault(require("../dbModels/booking"));
const createPayPalOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId, amount } = req.body;
    console.log(req.body, "-----------------");
    if (!bookingId || !amount) {
        return res.status(400).json({ message: "Booking ID and amount are required." });
    }
    try {
        // PayPal API credentials
        const clientId = process.env.PAYPAL_CLIENT_ID;
        const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
        const baseURL = "https://sandbox.paypal.com"; // Sandbox URL for testing
        // Get PayPal access token
        const authResponse = yield fetch(`${baseURL}/v1/oauth2/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
            },
            body: "grant_type=client_credentials",
        });
        const authData = yield authResponse.json();
        console.log(authData, "authDAta");
        if (!authResponse.ok) {
            throw new Error(authData.error || "Failed to fetch PayPal access token.");
        }
        const accessToken = authData.access_token;
        // Create PayPal order
        const orderResponse = yield fetch(`${baseURL}/v2/checkout/orders`, {
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
        const orderData = yield orderResponse.json();
        console.log('orderData', orderData);
        if (!orderResponse.ok) {
            throw new Error(orderData.error || "Failed to create PayPal order.");
        }
        res.status(201).json({ orderID: orderData.id });
    }
    catch (error) {
        console.error("Error creating PayPal order:", error);
        res.status(500).json({ message: "Failed to create PayPal order." });
    }
});
exports.createPayPalOrder = createPayPalOrder;
const capturePayPalOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderID, bookingId } = req.body;
    if (!orderID || !bookingId) {
        return res.status(400).json({ message: "Order ID and Booking ID are required." });
    }
    try {
        const clientId = process.env.PAYPAL_CLIENT_ID;
        const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
        const baseURL = "https://api-m.sandbox.paypal.com";
        // Get PayPal access token
        const authResponse = yield fetch(`${baseURL}/v1/oauth2/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
            },
            body: "grant_type=client_credentials",
        });
        console.log('authREsponse,', authResponse);
        const authData = yield authResponse.json();
        console.log("authData Response:", authData);
        if (!authResponse.ok) {
            throw new Error(authData.error || "Failed to fetch PayPal access token.");
        }
        const accessToken = authData.access_token;
        // Capture payment
        const captureResponse = yield fetch(`${baseURL}/v2/checkout/orders/${orderID}/capture`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });
        const captureData = yield captureResponse.json();
        if (!captureResponse.ok) {
            throw new Error(captureData.error || "Failed to capture PayPal order.");
        }
        // Mark payment as complete in the database
        yield booking_1.default.findByIdAndUpdate(bookingId, { "payment.status": "completed" });
        res.status(200).json({ message: "Payment captured successfully.", details: captureData });
    }
    catch (error) {
        console.error("Error capturing PayPal order:", error);
        res.status(500).json({ message: "Failed to capture PayPal order." });
    }
});
exports.capturePayPalOrder = capturePayPalOrder;
const paypalClient_1 = __importDefault(require("./paypalClient"));
const checkout_server_sdk_1 = __importDefault(require("@paypal/checkout-server-sdk"));
const createPayPalOrder2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId, amount } = req.body;
    console.log(req.body, "-----------------");
    if (!bookingId || !amount) {
        return res.status(400).json({ message: "Booking ID and amount are required." });
    }
    const request = new checkout_server_sdk_1.default.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: amount,
                },
            },
        ]
    });
    try {
        const order = yield paypalClient_1.default.execute(request);
        res.json({ id: order.result.id });
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.createPayPalOrder2 = createPayPalOrder2;
const capturePayPalOrder2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, bookingId } = req.body;
    console.log(req.body, "capture");
    if (!orderId || !bookingId) {
        return res.status(400).json({ message: "Order ID and Booking ID are required." });
    }
    const request = new checkout_server_sdk_1.default.orders.OrdersCaptureRequest(orderId);
    //request.requestBody({});
    try {
        const capture = yield paypalClient_1.default.execute(request);
        yield booking_1.default.findByIdAndUpdate(bookingId, { "payment.status": "completed" });
        res.json(capture.result);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.capturePayPalOrder2 = capturePayPalOrder2;
//# sourceMappingURL=payemntService.js.map