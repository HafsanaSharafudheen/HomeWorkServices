import { connectToDatabase } from '../src/FrameWorks/Database/MongoDb'
import '../src/FrameWorks/Express/Server'

(async () => {
  await connectToDatabase();
})();
