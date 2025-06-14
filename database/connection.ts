import CustomTypeORMLogger from "@/helpers/type-orm.logger";
import { DataSource } from "typeorm";


// PostgreSQL Configuration
export const PostgresSQLDatabase = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_SQL_CONNECTION_STRING as string,
  synchronize: true,
  logging: true, // Enable logging
  logger: new CustomTypeORMLogger(), // Use custom logger
});

// MongoDB Configuration
export const MongoDBDatabase = new DataSource({
  type: "mongodb",
  url: process.env.MONGO_DB_CONNECTION_STRING as string,
  useUnifiedTopology: true,
  logging: true,
  logger: new CustomTypeORMLogger(), // Use custom logger
});

// Initialize PostgreSQL
export const initializePostgres = async () => {
  try {
    await PostgresSQLDatabase.initialize();
    console.log("PostgreSQL database connected successfully!");
  } catch (error) {
    console.error("Error connecting to PostgreSQL database:", error);
    process.exit(1);
  }
};

// Initialize MongoDB
export const initializeMongoDB = async () => {
  try {
    await MongoDBDatabase.initialize();
    console.log("MongoDB database connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB database:", error);
    process.exit(1);
  }
};