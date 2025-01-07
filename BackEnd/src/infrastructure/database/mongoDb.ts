import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async (): Promise<void> => {
    console.log("connectDB started");
    try {
         const uri=process.env.DB_URL||"";
          const options: ConnectOptions = {}; 

        await mongoose.connect(uri, options);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

export default connectDB;
