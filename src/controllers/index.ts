import { Request, Response } from "express";
import { models } from "../models/index.js";

export const controllers = {
  test: async (req: Request, res: Response) => {
    const result = await models.test();
    res.send(result);
  },
};
