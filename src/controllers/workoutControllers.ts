import { Request, Response } from "express";
import { workoutModels } from "../models/index.js";
import { validateRequestData } from "../utils/index.js";
import { ValidationError } from "yup";
import {
  workoutAssignmentSchema,
  circuitAssignmentSchema,
  exerciseAssignmentSchema,
  exerciseSchema,
} from "../schemas/schemas.js";

export const workoutControllers = {
  getWorkouts: async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ message: req.params });
  },
  postExercise: async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("checking");
      const validatedExerciseSchema = await validateRequestData(exerciseSchema, req.body);
      console.log(typeof validatedExerciseSchema);
      const exerciseResponse = await workoutModels.postExercise(validatedExerciseSchema);

      res.status(201).json({ message: exerciseResponse });
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(500).json({ message: "Failed to create workout", error: err.message });
      } else {
        res.status(500).json({ message: "Failed to create workout", error: err });
      }
    }
  },
  postWorkoutAssignment: async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedAssignmentSchema = await validateRequestData(workoutAssignmentSchema, req.body);

      const workoutAssignmentResponse = await workoutModels.postWorkoutAssignment(validatedAssignmentSchema);

      res.status(201).json({ message: workoutAssignmentResponse });
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(500).json({ message: "Failed to create workout", error: err.message });
      } else {
        res.status(500).json({ message: "Failed to create workout", error: err });
      }
    }
  },
  postCircuitAssignment: async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedAssignmentSchema = await validateRequestData(circuitAssignmentSchema, req.body);

      const circuitAssignmentResponse = await workoutModels.postCircuitAssignment(validatedAssignmentSchema);

      res.status(201).json({ message: circuitAssignmentResponse });
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(500).json({ message: "Failed to create workout", error: err.message });
      } else {
        res.status(500).json({ message: "Failed to create workout", error: err });
      }
    }
  },
  postExerciseAssignment: async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedAssignmentSchema = await validateRequestData(exerciseAssignmentSchema, req.body);
      console.log(validatedAssignmentSchema);

      const exerciseAssignmentResponse = await workoutModels.postExerciseAssignment(validatedAssignmentSchema);

      res.status(201).json({ message: exerciseAssignmentResponse });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(500).json({ message: "Failed to create workout", error: error.message });
      }
    }
  },

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
