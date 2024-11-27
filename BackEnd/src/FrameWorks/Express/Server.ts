import express from "express";
import bodyParser from "body-parser";
import signupController from "../../Adapters/Controllers/signupController";
import { authMiddleware } from "../Middleware/authMiddleware";
import cors from 'cors'
import loginController from "../../Adapters/Controllers/loginController";
import errorMiddleware from "../Middleware/errorMiddleware";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());


app.use(cors({
    origin: true, 
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true
  }));

app.use(bodyParser.json());

app.post("/signup", signupController.handleSignup);

app.post("/login", loginController.handleLogin);
app.use(authMiddleware);









app.use(errorMiddleware);



export default app;