import mongoose from "mongoose";
import { dbConfig } from "./dbconfig";

export class Database {
  public static async connect(): Promise<void> {
    const { host, port, database, uri } = dbConfig;
    console.log(port, host, database, uri, "debug purpose");
    const connectionString = `mongodb://${host}:${port}/${database}`;
    console.log(connectionString, "string");
    try {
      await mongoose.connect(connectionString);
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Database connection error:", error);
      process.exit(1);
    }
  }
}
