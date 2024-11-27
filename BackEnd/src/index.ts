import connectToDatabase from "./frameWorks/Database/mongoDb";
import app from "./frameWorks/Express/server";

const PORT = 5000;

const startServer = async (): Promise<void> => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
