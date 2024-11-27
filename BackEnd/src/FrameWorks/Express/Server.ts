import express from "express";
import bodyParser from "body-parser";
import signupController from "../../Adapters/Controllers/signupController";
import { authMiddleware } from "../Middleware/authMiddleware";

const app = express();
app.use(bodyParser.json());

app.post("/signup", signupController.handleSignup);

app.use(authMiddleware);



export default app;
