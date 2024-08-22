import { Request, Response } from "express";
import { relationModels } from "../models/index.js";

export const relationControllers = {
  // test: async (req: Request, res: Response): Promise<void> => {
  //   const result = await models.test();
  //   res.send(result);
  // },
  postCoachClientRelation: async (
    req: Request,
    res: Response
  ): Promise<void> => {},
  getCoachClientRelation: async (
    req: Request,
    res: Response
  ): Promise<void> => {},
  putCoachClientRelation: async (
    req: Request,
    res: Response
  ): Promise<void> => {},
};
