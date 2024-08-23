import express, { Request, Response } from "express";
import { setupMiddlewares } from "./middlewares/setupMiddlewares.js";

const app = express();
const port = process.env.PORT || 3000;

setupMiddlewares(app);
// app.get("/", (req: Request, res: Response) => {
//   res.send("hello");
// });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
