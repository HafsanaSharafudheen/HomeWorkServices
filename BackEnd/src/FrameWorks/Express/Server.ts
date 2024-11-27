import express from "express";
import bodyParser from "body-parser";
import signupController from "../../Adapters/Controllers/signupController";
import { authMiddleware } from "../Middleware/authMiddleware";
import cors from 'cors'
const allowedOrigin ='http:localhost:5173'

const app = express();

app.use(cors({
    origin: true, 
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true
  }));

app.use(bodyParser.json());

app.post("/signup", signupController.handleSignup);

app.use(authMiddleware);



export default app;
