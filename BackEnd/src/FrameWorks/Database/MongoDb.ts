import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async (): Promise<void> => {
    console.log("connectDB started");
    try {
        const uri = "mongodb+srv://hafsanasharafudheen:p40JNtEcUWgtbhbX@cluster0.aii1ptx.mongodb.net/homework";        
          const options: ConnectOptions = {}; 

        await mongoose.connect(uri, options);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

export default connectDB;
