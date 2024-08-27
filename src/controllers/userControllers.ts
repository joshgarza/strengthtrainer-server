import { Request, Response } from "express";
import { userModels } from "../models/index.js";
import { hashPassword, compareHash } from "../utils/async/hashing.js";

export const userControllers = {
  register: async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("Registering");
      const { username, email, password, role } = req.body;
      const hash = await hashPassword(password);

      // Add new user to users table
      const newUser = await userModels.register(username, email, hash, role);

      if (newUser) {
        res.status(201).json({
          message: "User successfully registered",
          jwt: "jwt goes here",
        });
      } else {
        console.error("Error registering user");
        res.status(500).json({ message: "Internal server error" });
      }
    } catch (err) {
      res.send("Error");
    }
  },
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("Logging in");
      const { email, password } = req.body;

      // Retrieve the stored hash for the given email
      const hash = await userModels.getUserHash(email);

      // Check if hash exists (i.e., user exists)
      if (!hash) {
        res.status(401).json({ message: "User not found" });
      }

      // Compare the provided password with the stored hash
      const isMatch = await compareHash(password, hash);

      if (isMatch) {
        res.status(200).json({ message: "Logged in successfully" });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (err) {
      console.error("Error logging in:", err);
      // Internal server error
      res.status(500).json({ message: "Internal server error" });
    }
  },
  passwordReset: async (req: Request, res: Response): Promise<void> => {},
  resetPassword: async (req: Request, res: Response): Promise<void> => {},
};
