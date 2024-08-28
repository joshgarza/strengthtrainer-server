import { Request, Response } from "express";
import { signJWT, checkPassword, registerUser } from "../utils/index.js";

export const userControllers = {
  register: async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, password, role } = req.body;
      const { valid, userData, error } = await registerUser(
        username,
        email,
        password,
        role
      );

      if (!valid) {
        res.status(500).json({ message: error });
      }

      const jwt = await signJWT(userData);

      res.status(201).json({
        message: "User successfully registered",
        jwt: jwt,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error registering user" });
    }
  },
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const { valid, userData, error } = await checkPassword(email, password);

      if (!valid) {
        res.status(401).json({ message: error });
      }

      const jwt = await signJWT(userData);
      res.status(200).json({ message: "Logged in successfully", jwt: jwt });
    } catch (err) {
      console.error("Error logging in:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  passwordReset: async (req: Request, res: Response): Promise<void> => {},
  resetPassword: async (req: Request, res: Response): Promise<void> => {},
};
