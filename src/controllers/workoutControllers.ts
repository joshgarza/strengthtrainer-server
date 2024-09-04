import { Request, Response } from "express";
import { workoutModels } from "../models/index.js";
import { validateWorkout, validateCircuit } from "../utils/index.js";
import { ValidationError } from "yup";

// {
//   "user_id": 4,
//   "coach_id": 4,
//   "workout_date": "2024-08-28T07:30:00Z",
//   "name": null,
//   "description": null,
//   "notes": null
// }

export const workoutControllers = {
  getWorkouts: async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ message: req.params });
  },
  postWorkout: async (req: Request, res: Response): Promise<void> => {
    try {
      await validateWorkout(req.body);

      const workoutData = await workoutModels.postWorkout(req.body);

      res.status(201).json({ message: workoutData });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(500).json({ message: "Failed to create workout", error: error.message });
      }
    }
  },
  postCircuit: async (req: Request, res: Response): Promise<void> => {
    try {
      await validateCircuit(req.body);

      const circuitData = await workoutModels.postCircuit(req.body);

      res.status(201).json({ message: circuitData });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(500).json({ message: "Failed to create workout", error: error.message });
      }
    }
  },
  postExercise: async (req: Request, res: Response): Promise<void> => {},

  putWorkout: async (req: Request, res: Response): Promise<void> => {},
  putCircuit: async (req: Request, res: Response): Promise<void> => {},
  putExercise: async (req: Request, res: Response): Promise<void> => {},

  postWorkoutResult: async (req: Request, res: Response): Promise<void> => {},
  putWorkoutResult: async (req: Request, res: Response): Promise<void> => {},

  // POST MVP
  postWorkoutTemplate: async (req: Request, res: Response): Promise<void> => {},
  postCircuitTemplate: async (req: Request, res: Response): Promise<void> => {},
  postExerciseTemplate: async (req: Request, res: Response): Promise<void> => {},

  putWorkoutTemplate: async (req: Request, res: Response): Promise<void> => {},
  putCircuitTemplate: async (req: Request, res: Response): Promise<void> => {},
  putExerciseTemplate: async (req: Request, res: Response): Promise<void> => {},
};
