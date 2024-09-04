import { InferType } from "yup";
import { workoutDataSchema, circuitDataSchema } from "../schemas/schemas.ts";

export type WorkoutData = InferType<typeof workoutDataSchema>;
export type CircuitData = InferType<typeof circuitDataSchema>;

export type Schema = typeof workoutDataSchema | typeof circuitDataSchema;
export type Data = WorkoutData | CircuitData;
