import { Request, Response } from "express";
import { userModels } from "../models/index.js";

export const userControllers = {
  // test: async (req: Request, res: Response): Promise<void> => {
  //   const result = await models.test();
  //   res.send(result);
  // },
  register: async (req: Request, res: Response): Promise<void> => {},
  login: async (req: Request, res: Response): Promise<void> => {},
  passwordReset: async (req: Request, res: Response): Promise<void> => {},
  resetPassword: async (req: Request, res: Response): Promise<void> => {},
};
