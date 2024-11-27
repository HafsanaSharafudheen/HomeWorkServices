import express from "express";
import bodyParser from "body-parser";
import signupController from "../../Adapters/Controllers/signupController";

const app = express();
app.use(bodyParser.json());

app.post("/signup", signupController.handleSignup);

export default app;
