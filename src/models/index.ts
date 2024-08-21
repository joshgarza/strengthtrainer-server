import { client, connectDB, disconnectDB } from "../config/db.js";

connectDB();

export const models = {
  test: async () => {
    const result = await client.query("SELECT NOW()");
    return result.rows[0].now;
  },
};

process.on("SIGINT", async () => {
  await disconnectDB();
  process.exit(0);
});
