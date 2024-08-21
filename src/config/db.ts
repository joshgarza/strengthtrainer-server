import pg from "pg";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const { Client } = pg;

export const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
});

export async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1); // Exit the process if connection fails
  }
}

export async function disconnectDB() {
  try {
    await client.end();
    console.log("Disconnected from the database");
  } catch (error) {
    console.error("Failed to disconnect from the database", error);
  }
}
