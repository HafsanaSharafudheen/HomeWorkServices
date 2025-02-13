import express from "express";
import bodyParser from "body-parser";
import signupController from "../../presentation/controllers/signupController";
import cors from 'cors'
import loginController from "../../presentation/controllers/loginController";
import errorMiddleware from "../middleware/errorMiddleware";
import dotenv from "dotenv";
import http from "http";

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
import { fetchDashboardData } from "../controllers/admin/fetchDashboardData";
import { fetchServiceProviderDashboardData, fetchDashboardDataWithDate } from '../controllers/providers/fetchServiceProviderDashboardData';
import fetchProviderBookings from "../controllers/providers/fetchProviderBookings";
import updateStatus from "../controllers/providers/bookingStstusUpdate";
import { createNewDIY, findAllDiysByProvider } from "../controllers/providers/createNewDIY";
import fetchTestimonials from "../controllers/user/fetchTestimonials ";
import userActions from "../controllers/admin/userActions";
import { saveChatMessage, fetchUsersChatHistory, fetchProvidersChatHistory, fetchChatHistory } from '../controllers/user/chatsController';
import { uploadProfilePictureOfUser, UserProfileUpdate } from "../controllers/user/userProfileUpdate";
import upload from "../middleware/multer";
import { markMessageAsRead } from "../controllers/user/chatsController";

import path from "path";
import { fetchAdminDetails } from "../controllers/admin/fetchProfile";
import adminAddCategories, { deleteCategoriesFromAdmin } from "../controllers/admin/adminAddCategories";
import { fetchAllServices } from "../controllers/services/fetchAllServices";
dotenv.config();
const app = express();
const server = http.createServer(app);

app.use(express.json());

app.use(cookieParser());


if( process.env.NODE_ENV === 'production' ){
	app.use('/uploads', express.static((process.env.UPLOADPATH||"")));
} else {
	app.use('/uploads', express.static( 'uploads'));
}





// app.use(cors({
//     origin: true, 
//     methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//     credentials: true
//   }));

// app.use(cors({
//   origin: "http://homeworksapp.shop", // ✅ Replace with your frontend URL
//   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//   credentials: true // ✅ Ensures cookies are included in requests
// }));
app.use(cors({
  origin:  process.env.NODE_ENV === 'production' ? "https://homeworksapp.shop" : true,  
  credentials: true, 
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
  exposedHeaders: ['Set-Cookie'] 
}));



app.use(bodyParser.json());

import initSocketIO from '../../infrastructure/services/socketServer';
import fetchAllDiys from "../controllers/user/fetchAllDiys";
import fetchAllcategories from "../controllers/user/fetchAllcategories";
import { getUserBookingsbyTime } from "../controllers/booking/fetchBookingsByDate";
import { deleteFromUser } from "../controllers/user/DeleteBooking";
import { razorpayBooking, razorpayPaymentToBankAccount } from "../controllers/booking/payementCOntroller";
import { workingProgressUpdate } from "../controllers/booking/workingProgressUpdate";
import providerActions from "../controllers/admin/providerActions";
import fetchWorkSamples from "../controllers/user/fetchWorkSamples";
initSocketIO(server);

app.get('/testimonials',fetchTestimonials )



app.post("/signup", signupController.handleSignup);
app.post('/forgot-password',loginController.forgotPassword)
app.post('/reset-password/:token', loginController.resetPassword);

app.post("/login", loginController.handleLogin);
app.post("/providerSignup", providerSignupController.handleSignup);
app.get('/fetchUsers',fetchUsers);
app.get('/fetchProviders',fetchServiceProviders);
app.get('/all-diys',fetchAllDiys)
app.get('/allServices',fetchAllServices);
app.get('/providers',fetchAllProvidersByCategory);
app.get('/workSamples/:providerId',fetchWorkSamples)

console.log("before verify tocken");
app.use(verifyToken);
console.log("after verify tocken");

app.get('/serviceProviderProfile',fetchProfileDetails);

app.post('/updateProfile',ServiceProfileUpdate)
app.post('/updateUserProfile',UserProfileUpdate)

app.get('/fetchProviderBookings',fetchProviderBookings)

app.post('/updateAvailability', updateAvailability);
app.post('/booking', createBooking);
app.get('/bookingDetails',getUserBookings)
app.get('/fetchUserDetails',getUserDetails)

app.post(
  "/reviews",
  upload.fields([
    { name: "workImage", maxCount: 10 },
    { name: "workVideo", maxCount: 5 },
  ]),
  SaveReview
);

app.get('/fetchAllBookings',fetchBookings)

app.get('/getReviewDetails',getReview)
app.get('/adminDashboardData',fetchDashboardData)
app.get('/ServiceProviderDashboardData',fetchServiceProviderDashboardData)
app.get('/dashboardDataWithDate',fetchDashboardDataWithDate)
app.patch('/updateBookingStatus',updateStatus)
app.post('/createDIY', upload.fields([
  { name: "photos", maxCount: 10 },
  { name: "videos", maxCount: 5 },]),createNewDIY)
app.get('/DiysByProvider',findAllDiysByProvider)
app.patch("/block/:id", userActions.blockUser);
app.patch("/unblock/:id", userActions.unblockUser);

app.get('/providersReviews/:providerId', providerActions.fetchAllReviews);

app.patch("/blockProvider/:id", providerActions.blockProvider);
app.patch("/unblockProvider/:id", providerActions.unblockProvider);
app.post('/upload-profile-picture', upload.single('profilePicture'),uploadProfilePictureOfUser)
app.get('/fetchCategories',fetchAllcategories)
app.get('/providerChatList',fetchProvidersChatHistory);
app.get('/userChatList',fetchUsersChatHistory)
app.get('/chatHistory',fetchChatHistory)
app.post('/saveChatMessage',saveChatMessage)
app.get('/adminDetails',fetchAdminDetails)
app.post('/markAsRead', markMessageAsRead )
app.get('/AdminCategories',adminAddCategories.fetchAllCategories)
app.post('/addCategories', upload.single('categoryImage'),adminAddCategories.addCategory)

app.post('/updateWorkDetails', upload.fields([
  { name: "photos", maxCount: 10 },
  { name: "videos", maxCount: 5 },]),workingProgressUpdate)



app.get('/bookingsSlot',getUserBookingsbyTime)



app.post('/deleteBooking',deleteFromUser)
// payment
app.post('/razorpay',razorpayBooking )
app.post('/updateBookingDetails',updateStatus)
app.post('/transferDate',razorpayPaymentToBankAccount )
app.post('/deleteCategories', deleteCategoriesFromAdmin);
app.put("/editCategory/:id", upload.single("categoryImage"), adminAddCategories.editCategory);

app.use(errorMiddleware);



export { app, server};
