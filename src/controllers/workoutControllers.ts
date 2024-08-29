import { Request, Response } from "express";
import { workoutModels } from "../models/index.js";

export const workoutControllers = {
  getWorkouts: async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ message: req.params });
  },
  postWorkout: async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await workoutModels.createWorkout(req.body);
      res.status(201).json({ message: "Workout created successfully", data: result });
    } catch (err) {
      res.status(500).json({ message: "Failed to create workout", error: err });
    }
  },
  putWorkout: async (req: Request, res: Response): Promise<void> => {},
  postWorkoutResult: async (req: Request, res: Response): Promise<void> => {},
  putWorkoutResult: async (req: Request, res: Response): Promise<void> => {},
};
