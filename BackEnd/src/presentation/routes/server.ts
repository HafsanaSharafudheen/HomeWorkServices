import express from "express";
import bodyParser from "body-parser";
import signupController from "../../presentation/controllers/signupController";
import cors from 'cors'
import loginController from "../../presentation/controllers/loginController";
import errorMiddleware from "../middleware/errorMiddleware";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import providerSignupController from "../../presentation/controllers/providerSignupController";
import fetchUsers from '../../presentation/controllers/admin/fetchUsers';
import fetchServiceProviders from "../../presentation/controllers/admin/fetchServiceProviders";
import fetchProfileDetails from "../../presentation/controllers/providers/fetchProfileDetails";
import { verifyToken } from '../../presentation/Security/jwtService';
import ServiceProfileUpdate from "../../presentation/controllers/providers/profileUpdate";
import fetchAllProvidersByCategory from "../controllers/providers/fetchAllProvidersByCategory";
import updateAvailability from "../controllers/providers/avilableUpdate";
import { createBooking } from "../controllers/booking/createBooking";
import { getUserBookings } from "../controllers/booking/getBookingDetails";
import { getUserDetails } from "../controllers/user/fetchUserDetails";
import { SaveReview } from "../controllers/user/saveReviewFromUser";
import { getReview } from "../controllers/user/reviewDetails";
import fetchBookings from "../controllers/admin/fetchBookings";
dotenv.config();
const app = express();
app.use(express.json());

app.use(cookieParser());


app.use(cors({
    origin: true, 
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
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

app.post('/updateProfile',ServiceProfileUpdate)
app.get('/providers',fetchAllProvidersByCategory);


app.post('/updateAvailability', updateAvailability);
app.post('/booking', createBooking);
app.get('/bookingDetails',getUserBookings)
app.get('/fetchUserDetails',getUserDetails)
app.post('/reviews',SaveReview)
app.get('/fetchAllBookings',fetchBookings)
app.get('/getReviewDetails',getReview)
app.use(errorMiddleware);



export default app;
