import { object, array, string, number, date, boolean, InferType, ValidationError } from "yup";
import { castNullToZero } from "../utils/index.js";

/**
 * For every schema created, import the schema into types/index.d.ts, infer type from schema, and add both schema and type to Schema and Data types respectively.
 */

export const workoutAssignmentSchema = object({
  user_id: number().required(),
  coach_id: number().required(),
  program_assignment_id: number().nullable().default(null),
  workout_assignment_template_id: number().nullable().default(null),
  workout_date: date().required(),
  workout_position: number().nullable().default(null),
  name: string().nullable().default(null),
  description: string().nullable().default(null),
  notes: string().nullable().default(null),
});

export const circuitAssignmentSchema = object({
  user_id: number().required(),
  coach_id: number().required(),
  workout_assignment_id: number().required(),
  circuit_assignment_template_id: number().nullable().default(null),
  circuit_position: number().nullable().default(null),
  sets: number().required(),
  rest_period: number().nullable().transform(castNullToZero),
});

export const exerciseAssignmentSchema = object({
  user_id: number().required(),
  coach_id: number().required(),
  circuit_assignment_id: number().required(),
  exercise_assignment_template_id: number().nullable().default(null),
  exercise_id: number().required(),
  exercise_position: number().nullable().default(null),
  sets: number().nullable().default(null),
  reps: number().nullable().default(null),
  weight: number().nullable().default(null),
  percentage_of_e1rm: number().nullable().default(null),
  percentage_of_last_set: number().nullable().default(null),
  adjusted_weight: number().nullable().default(null),
  rpe_target: number().nullable().default(null),
  amrap: boolean().nullable().default(null),
  amsap: boolean().nullable().default(null),
  duration: number().nullable().default(null),
  rest_period: number().nullable().transform(castNullToZero),
});
