import { Request, Response } from "express";
import { signJWT, checkPassword, registerUser } from "../utils/index.js";

export const userControllers = {
  register: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, email, password, role } = req.body;
      const userData = await registerUser(name, email, password, role);
      const jwt = await signJWT(userData);
      return res.status(201).json({
        message: "User successfully registered",
        jwt: jwt,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error registering user" });
    }
  },
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const userData = await checkPassword(email, password);
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
