import { Request, Response } from "express";
import { userModels } from "../models/index.js";
import { hashPassword, compareHash } from "../utils/index.js";
import { signJWT, verifyJWT } from "../utils/index.js";

export const userControllers = {
  register: async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, password, role } = req.body;
      const hash = await hashPassword(password);

      // Add new user to users table
      const newUser = await userModels.register(username, email, hash, role);

      if (newUser) {
        const userData = {
          id: newUser.id,
          username: username,
          email: email,
          role: role,
        };
        const jwt = await signJWT(userData);

        res.status(201).json({
          message: "User successfully registered",
          jwt: jwt,
        });
      } else {
        console.error("Error registering user");
        res.status(500).json({ message: "Internal server error" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error registering user" });
    }
  },
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      // Retrieve the stored hash for the given email
      const hash = await userModels.getUserHash(email);

      // Check if hash exists (i.e., user exists)
      if (!hash) {
        res.status(401).json({ message: "User not found" });
      }

      // Compare the provided password with the stored hash
      const hashesMatch = await compareHash(password, hash);

      if (hashesMatch) {
        // retrieve user information to be signed in JWT
        const userData = await userModels.getUserData(email);
        const jwt = await signJWT(userData);

        /**
          interface UserData {
            id: string;
            username: string;
            email: string;
            role: string;
          }
        */
        res.status(200).json({ message: "Logged in successfully", jwt: jwt });
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
