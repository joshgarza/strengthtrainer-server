import { object, array, string, number, date, boolean, InferType, ValidationError } from "yup";
import { castNullToZero } from "../utils/index.js";

/**
 * For every schema created, import the schema into types/lib.d.ts, infer type from schema, and add both schema and type to Schema and Data types respectively.
 */

export const workoutDataSchema = object({
  user_id: number().required(),
  coach_id: number().required(),
  program_assignment_id: number().nullable().default(null),
  workout_assignment_template_id: number().nullable().default(null),
  workout_date: date().required(),
  name: string().nullable().default(null),
  description: string().nullable().default(null),
  notes: string().nullable().default(null),
});

export const circuitDataSchema = object({
  user_id: number().required(),
  coach_id: number().required(),
  workout_assignment_id: number().required(),
  circuit_assignment_template_id: number().nullable().default(null),
  sets: number().required(),
  rest_period: number().nullable().transform(castNullToZero),
});
