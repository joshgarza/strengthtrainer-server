import { Request, Response } from "express";
import { userModels } from "../models/index.js";

export const userControllers = {
  test: async (req: Request, res: Response): Promise<void> => {
    res.send("hello");
  },
  register: async (req: Request, res: Response): Promise<void> => {
    console.log("Registering");
    const name = "josh";
    const email = "josh@josh-garza.com";
    const passwordHash = "afsjkl34jw3890sf8a9";
    const role = "coach";
    res.send(userModels.register(name, email, passwordHash, role));
  },
  login: async (req: Request, res: Response): Promise<void> => {},
  passwordReset: async (req: Request, res: Response): Promise<void> => {},
  resetPassword: async (req: Request, res: Response): Promise<void> => {},
};
