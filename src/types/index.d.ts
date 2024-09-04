// types/express.d.ts
import { JwtPayload } from "jsonwebtoken";
import { InferType } from "yup";
import { workoutDataSchema, circuitDataSchema } from "../schemas/schemas.ts";

declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload;
    }
  }
  export type WorkoutData = InferType<typeof workoutDataSchema>;
  export type CircuitData = InferType<typeof circuitDataSchema>;

  export type apiSchema = typeof workoutDataSchema | typeof circuitDataSchema;
  export type RequestData = WorkoutData | CircuitData;
}
