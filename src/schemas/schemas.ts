import { object, string, number, date, boolean } from "yup";
import { castZeroToNull, xorValidation, oneOfValidation } from "../utils/index.js";

/**
 * For every schema created, import the schema into types/index.d.ts, infer type from schema, and add both schema and type to Schema and Data types respectively.
 */

export const exerciseSchema = object({
  user_id: number().required(),
  name: string().required(),
  description: string().nullable().default(""),
  difficulty: string().required(),
});

export const workoutAssignmentSchema = object({
  user_id: number().required(),
  coach_id: number().required(),
  program_assignment_id: number().nullable().default(null),
  workout_assignment_template_id: number().nullable().default(null),
  workout_date: date().required(),
  position: number().nullable().default(null),
  name: string().nullable().default(null),
  description: string().nullable().default(null),
  notes: string().nullable().default(null),
});

export const circuitAssignmentSchema = object({
  user_id: number().required(),
  coach_id: number().required(),
  workout_assignment_id: number().required(),
  circuit_assignment_template_id: number().nullable().default(null),
  position: number().nullable().default(null),
  sets: number().required(),
  rest_period: number().nullable().default(0),
});

export const exerciseAssignmentSchema = object({
  user_id: number().required(),
  coach_id: number().required(),
  circuit_assignment_id: number().required(),
  exercise_assignment_template_id: number().nullable().default(null),
  exercise_id: number().required(),
  position: number().nullable().default(null),
  sets: number().nullable().default(null).transform(castZeroToNull),
  reps: number().nullable().default(null).transform(castZeroToNull),
  weight: number().nullable().default(null).transform(castZeroToNull),
  percentage_of_e1rm: number().nullable().default(null),
  percentage_of_last_set: number().nullable().default(null),
  adjusted_weight: number().nullable().default(null),
  rpe_target: number().nullable().default(null),
  amrap: boolean().nullable().default(null),
  amsap: boolean().nullable().default(null),
  duration: number().nullable().default(null),
  rest_period: number().nullable().default(0),
})
  .test("xor-reps-amrap", "You can only have reps if amrap is false, and vice versa.", xorValidation("reps", "amrap"))
  .test("xor-sets-amsap", "You can only have sets if amsap is false, and vice versa.", xorValidation("sets", "amsap"))
  .test(
    "oneOf-weight-percentageOfe1rm-percentageOfLastSet",
    "You must have only one of weight, percentage_of_last_set, or percentage_of_e1rm",
    oneOfValidation(["weight", "percentage_of_e1rm", "percentage_of_last_set"])
  );

export const exerciseAssignmentResultSchema = object({
  user_id: number().required(),
  coach_id: number().required(),
  exercise_assignment_id: number().required(),
  actual_sets: number().nullable().default(null),
  actual_reps: number().nullable().default(null),
  actual_weight: number().nullable().default(null),
  actual_rpe: number().nullable().default(null),
  actual_duration: number().nullable().default(null),
  notes: string().nullable().default(null),
  completed_at: date().nullable().default(null),
});
