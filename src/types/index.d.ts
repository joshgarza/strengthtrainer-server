// types/express.d.ts
import { JwtPayload } from "jsonwebtoken";
import { InferType } from "yup";
import { workoutAssignmentSchema, circuitAssignmentSchema, exerciseAssignmentSchema } from "../schemas/schemas.ts";

declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload;
    }
  }
  export type WorkoutAssignment = InferType<typeof workoutAssignmentSchema>;
  export type CircuitAssignment = InferType<typeof circuitAssignmentSchema>;
  export type ExerciseAssignment = InferType<typeof exerciseAssignmentSchema>;

  export type apiSchema =
    | typeof workoutAssignmentSchema
    | typeof circuitAssignmentSchema
    | typeof exerciseAssignmentSchema;
  export type RequestData = WorkoutAssignment | CircuitAssignment | ExerciseAssignment;
}
