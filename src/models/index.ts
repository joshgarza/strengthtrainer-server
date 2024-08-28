import { client, connectDB, disconnectDB } from "../config/db.js";

connectDB();

export { userModels } from "./userModels.js";
export { workoutModels } from "./workoutModels.js";
export { relationModels } from "./relationModels.js";

process.on("SIGINT", async () => {
  await disconnectDB();
  process.exit(0);
});
