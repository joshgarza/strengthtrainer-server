import { Request, Response } from "express";
import { workoutModels } from "../models/index.js";

export const workoutControllers = {
  // test: async (req: Request, res: Response): Promise<void> => {
  //   const result = await models.test();
  //   res.send(result);
  // },
  getWorkouts: async (req: Request, res: Response): Promise<void> => {},
  postWorkout: async (req: Request, res: Response): Promise<void> => {},
  putWorkout: async (req: Request, res: Response): Promise<void> => {},
  postWorkoutResult: async (req: Request, res: Response): Promise<void> => {},
  putWorkoutResult: async (req: Request, res: Response): Promise<void> => {},
};
