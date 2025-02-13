"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const signupController_1 = __importDefault(require("../../presentation/controllers/signupController"));
const cors_1 = __importDefault(require("cors"));
const loginController_1 = __importDefault(require("../../presentation/controllers/loginController"));
const errorMiddleware_1 = __importDefault(require("../middleware/errorMiddleware"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const providerSignupController_1 = __importDefault(require("../../presentation/controllers/providerSignupController"));
const fetchUsers_1 = __importDefault(require("../../presentation/controllers/admin/fetchUsers"));
const fetchServiceProviders_1 = __importDefault(require("../../presentation/controllers/admin/fetchServiceProviders"));
const fetchProfileDetails_1 = __importDefault(require("../../presentation/controllers/providers/fetchProfileDetails"));
const jwtService_1 = require("../../presentation/Security/jwtService");
const profileUpdate_1 = __importDefault(require("../../presentation/controllers/providers/profileUpdate"));
const fetchAllProvidersByCategory_1 = __importDefault(require("../controllers/providers/fetchAllProvidersByCategory"));
const avilableUpdate_1 = __importDefault(require("../controllers/providers/avilableUpdate"));
const createBooking_1 = require("../controllers/booking/createBooking");
const getBookingDetails_1 = require("../controllers/booking/getBookingDetails");
const fetchUserDetails_1 = require("../controllers/user/fetchUserDetails");
const saveReviewFromUser_1 = require("../controllers/user/saveReviewFromUser");
const reviewDetails_1 = require("../controllers/user/reviewDetails");
const fetchBookings_1 = __importDefault(require("../controllers/admin/fetchBookings"));
const fetchDashboardData_1 = require("../controllers/admin/fetchDashboardData");
const fetchServiceProviderDashboardData_1 = require("../controllers/providers/fetchServiceProviderDashboardData");
const fetchProviderBookings_1 = __importDefault(require("../controllers/providers/fetchProviderBookings"));
const bookingStstusUpdate_1 = __importDefault(require("../controllers/providers/bookingStstusUpdate"));
const createNewDIY_1 = require("../controllers/providers/createNewDIY");
const fetchTestimonials_1 = __importDefault(require("../controllers/user/fetchTestimonials "));
const userActions_1 = __importDefault(require("../controllers/admin/userActions"));
const chatsController_1 = require("../controllers/user/chatsController");
const userProfileUpdate_1 = require("../controllers/user/userProfileUpdate");
const multer_1 = __importDefault(require("../middleware/multer"));
const chatsController_2 = require("../controllers/user/chatsController");
const fetchProfile_1 = require("../controllers/admin/fetchProfile");
const adminAddCategories_1 = __importStar(require("../controllers/admin/adminAddCategories"));
const fetchAllServices_1 = require("../controllers/services/fetchAllServices");
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
exports.server = server;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
if (process.env.NODE_ENV === 'production') {
    app.use('/uploads', express_1.default.static((process.env.UPLOADPATH || "")));
}
else {
    app.use('/uploads', express_1.default.static('uploads'));
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
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === 'production' ? "https://homeworksapp.shop" : true,
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie']
}));
app.use(body_parser_1.default.json());
const socketServer_1 = __importDefault(require("../../infrastructure/services/socketServer"));
const fetchAllDiys_1 = __importDefault(require("../controllers/user/fetchAllDiys"));
const fetchAllcategories_1 = __importDefault(require("../controllers/user/fetchAllcategories"));
const fetchBookingsByDate_1 = require("../controllers/booking/fetchBookingsByDate");
const DeleteBooking_1 = require("../controllers/user/DeleteBooking");
const payementCOntroller_1 = require("../controllers/booking/payementCOntroller");
const workingProgressUpdate_1 = require("../controllers/booking/workingProgressUpdate");
const providerActions_1 = __importDefault(require("../controllers/admin/providerActions"));
const fetchWorkSamples_1 = __importDefault(require("../controllers/user/fetchWorkSamples"));
(0, socketServer_1.default)(server);
app.get('/testimonials', fetchTestimonials_1.default);
app.post("/signup", signupController_1.default.handleSignup);
app.post('/forgot-password', loginController_1.default.forgotPassword);
app.post('/reset-password/:token', loginController_1.default.resetPassword);
app.post("/login", loginController_1.default.handleLogin);
app.post("/providerSignup", providerSignupController_1.default.handleSignup);
app.get('/fetchUsers', fetchUsers_1.default);
app.get('/fetchProviders', fetchServiceProviders_1.default);
app.get('/all-diys', fetchAllDiys_1.default);
app.get('/allServices', fetchAllServices_1.fetchAllServices);
app.get('/providers', fetchAllProvidersByCategory_1.default);
app.get('/workSamples/:providerId', fetchWorkSamples_1.default);
console.log("before verify tocken");
app.use(jwtService_1.verifyToken);
console.log("after verify tocken");
app.get('/serviceProviderProfile', fetchProfileDetails_1.default);
app.post('/updateProfile', profileUpdate_1.default);
app.post('/updateUserProfile', userProfileUpdate_1.UserProfileUpdate);
app.get('/fetchProviderBookings', fetchProviderBookings_1.default);
app.post('/updateAvailability', avilableUpdate_1.default);
app.post('/booking', createBooking_1.createBooking);
app.get('/bookingDetails', getBookingDetails_1.getUserBookings);
app.get('/fetchUserDetails', fetchUserDetails_1.getUserDetails);
app.post("/reviews", multer_1.default.fields([
    { name: "workImage", maxCount: 10 },
    { name: "workVideo", maxCount: 5 },
]), saveReviewFromUser_1.SaveReview);
app.get('/fetchAllBookings', fetchBookings_1.default);
app.get('/getReviewDetails', reviewDetails_1.getReview);
app.get('/adminDashboardData', fetchDashboardData_1.fetchDashboardData);
app.get('/ServiceProviderDashboardData', fetchServiceProviderDashboardData_1.fetchServiceProviderDashboardData);
app.get('/dashboardDataWithDate', fetchServiceProviderDashboardData_1.fetchDashboardDataWithDate);
app.patch('/updateBookingStatus', bookingStstusUpdate_1.default);
app.post('/createDIY', multer_1.default.fields([
    { name: "photos", maxCount: 10 },
    { name: "videos", maxCount: 5 },
]), createNewDIY_1.createNewDIY);
app.get('/DiysByProvider', createNewDIY_1.findAllDiysByProvider);
app.patch("/block/:id", userActions_1.default.blockUser);
app.patch("/unblock/:id", userActions_1.default.unblockUser);
app.get('/providersReviews/:providerId', providerActions_1.default.fetchAllReviews);
app.patch("/blockProvider/:id", providerActions_1.default.blockProvider);
app.patch("/unblockProvider/:id", providerActions_1.default.unblockProvider);
app.post('/upload-profile-picture', multer_1.default.single('profilePicture'), userProfileUpdate_1.uploadProfilePictureOfUser);
app.get('/fetchCategories', fetchAllcategories_1.default);
app.get('/providerChatList', chatsController_1.fetchProvidersChatHistory);
app.get('/userChatList', chatsController_1.fetchUsersChatHistory);
app.get('/chatHistory', chatsController_1.fetchChatHistory);
app.post('/saveChatMessage', chatsController_1.saveChatMessage);
app.get('/adminDetails', fetchProfile_1.fetchAdminDetails);
app.post('/markAsRead', chatsController_2.markMessageAsRead);
app.get('/AdminCategories', adminAddCategories_1.default.fetchAllCategories);
app.post('/addCategories', multer_1.default.single('categoryImage'), adminAddCategories_1.default.addCategory);
app.post('/updateWorkDetails', multer_1.default.fields([
    { name: "photos", maxCount: 10 },
    { name: "videos", maxCount: 5 },
]), workingProgressUpdate_1.workingProgressUpdate);
app.get('/bookingsSlot', fetchBookingsByDate_1.getUserBookingsbyTime);
app.post('/deleteBooking', DeleteBooking_1.deleteFromUser);
// payment
app.post('/razorpay', payementCOntroller_1.razorpayBooking);
app.post('/updateBookingDetails', bookingStstusUpdate_1.default);
app.post('/transferDate', payementCOntroller_1.razorpayPaymentToBankAccount);
app.post('/deleteCategories', adminAddCategories_1.deleteCategoriesFromAdmin);
app.put("/editCategory/:id", multer_1.default.single("categoryImage"), adminAddCategories_1.default.editCategory);
app.use(errorMiddleware_1.default);
//# sourceMappingURL=server.js.map