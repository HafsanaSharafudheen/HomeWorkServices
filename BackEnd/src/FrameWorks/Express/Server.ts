import express from 'express';
import cors from 'cors';
import { connectDB } from '../../FrameWorks/Database/MongoDb'
import { userController } from '../../Adapters/Controllers/UserController'

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.post('/api/users/signup', userController.signup); // Route for user signup
// Add other routes as needed

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack); // Log the error for debugging
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

const startServer = async () => {
  try {
    await connectDB(); 
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer(); 
