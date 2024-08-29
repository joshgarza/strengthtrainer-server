import { Request, Response } from "express";
import { workoutModels } from "../models/index.js";
import { validateWorkout } from "../utils/index.js";
import { ValidationError } from "yup";

export const workoutControllers = {
  getWorkouts: async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ message: req.params });
  },
  postWorkout: async (req: Request, res: Response): Promise<void> => {
    try {
      // validate workout
      const { workoutData, error } = await validateWorkout(req.body);

      // const result = await workoutModels.createWorkout(workoutData);
      // res.status(201).json({ message: "Workout created successfully", data: result });
      res.status(201).json({ message: workoutData });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(500).json({ message: "Failed to create workout", error: error.message });
      }
    }
  },
  putWorkout: async (req: Request, res: Response): Promise<void> => {},
  postWorkoutResult: async (req: Request, res: Response): Promise<void> => {},
  putWorkoutResult: async (req: Request, res: Response): Promise<void> => {},
};
