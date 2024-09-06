// types/express.d.ts
import { JwtPayload } from "jsonwebtoken";
import { InferType } from "yup";
import {
  workoutAssignmentSchema,
  circuitAssignmentSchema,
  exerciseAssignmentSchema,
  exerciseAssignmentResultSchema,
  exerciseSchema,
} from "../schemas/schemas.ts";

declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload;
    }
  }
  export type Exercise = InferType<typeof exerciseSchema>;
  export type WorkoutAssignment = InferType<typeof workoutAssignmentSchema>;
  export type CircuitAssignment = InferType<typeof circuitAssignmentSchema>;
  export type ExerciseAssignment = InferType<typeof exerciseAssignmentSchema>;
  export type ExerciseAssignmentResult = InferType<typeof exerciseAssignmentResultSchema>;
  export type ValidatedData =
    | Exercise
    | WorkoutAssignment
    | CircuitAssignment
    | ExerciseAssignment
    | ExerciseAssignmentResult;
}
