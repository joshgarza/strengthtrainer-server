import { Request, Response } from "express";
import { userModels } from "../models/index.js";
import bcrypt from "bcrypt";

export const userControllers = {
  test: async (req: Request, res: Response): Promise<void> => {
    res.send("hello");
  },
  register: async (req: Request, res: Response): Promise<void> => {
    console.log("Registering");
    const { username, email, password, role } = req.body;
    // run password through bcrypt and send the result of that as password hash to userModels.register
    bcrypt.hash(password, 10, (err, hash) => {
      console.log("PW:", password);
      console.log("Hash:", hash);
      res.send(userModels.register(username, email, hash, role));
    });
  },
  login: async (req: Request, res: Response): Promise<void> => {
    console.log("Logging in");
    const { email, password } = req.body;

    // get user hash
    const hash = await userModels.getUserHash(email);
    console.log(hash);

    bcrypt.compare(password, hash, (err, result) => {
      if (err) {
        console.log("Error logging in:", err);
        res.send("Error logging in");
      } else {
        console.log("Result:", result);
        if (result) {
          res.send("Logged in.");
        } else {
          res.send("Error logging in");
        }
      }
    });
  },
  passwordReset: async (req: Request, res: Response): Promise<void> => {},
  resetPassword: async (req: Request, res: Response): Promise<void> => {},
};
