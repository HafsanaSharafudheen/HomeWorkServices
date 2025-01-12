import connectToDatabase from "./infrastructure/database/mongoDb";
import {app,server} from "./presentation/routes/server";
const PORT = 3000;


const startServer = async (): Promise<void> => {
  try {
    await connectToDatabase();
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
