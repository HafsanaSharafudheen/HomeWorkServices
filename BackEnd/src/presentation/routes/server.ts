import express from "express";
import bodyParser from "body-parser";
import signupController from "../../Adapters/Controllers/signupController";
import cors from 'cors'
import loginController from "../../Adapters/Controllers/loginController";
import errorMiddleware from "../middleware/errorMiddleware";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import providerSignupController from "../../Adapters/Controllers/providerSignupController";
import fetchUsers from '../../Adapters/Controllers/admin/fetchUsers';
import fetchServiceProviders from "../../Adapters/Controllers/admin/fetchServiceProviders";
import fetchProfileDetails from "../../Adapters/Controllers/providers/fetchProfileDetails";
import { verifyToken } from '../../Adapters/Security/jwtService';
import SaveServiceCharges from "../../Adapters/Controllers/providers/SaveServiceCharges";
import ServiceProfileUpdate from "../../Adapters/Controllers/providers/profileUpdate";
dotenv.config();
const app = express();
app.use(express.json());

app.use(cookieParser());


app.use(cors({
    origin: true, 
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true
  }));

app.use(bodyParser.json());

app.post("/signup", signupController.handleSignup);

app.post("/login", loginController.handleLogin);
app.post("/providerSignup", providerSignupController.handleSignup);
app.get('/fetchUsers',fetchUsers);
app.get('/fetchProviders',fetchServiceProviders);
app.use(verifyToken);
app.get('/serviceProviderProfile',fetchProfileDetails);

app.post('/service-charges',SaveServiceCharges)
app.post('/updateProfile',ServiceProfileUpdate)







app.use(errorMiddleware);



export default app;
