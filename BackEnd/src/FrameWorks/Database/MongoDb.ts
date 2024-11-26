import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'your-database-name';

let db: any;

export const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(dbName);
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};

export { db };
