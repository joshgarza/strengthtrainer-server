// import { WorkoutData } from "workout-types";
import { object, array, string, number, date, boolean, InferType, ValidationError } from "yup";

let workoutDataSchema = object({
  id: number().required(),
  workout_date: date().required(),
  description: string().nullable(),
  workout_assignment: object({
    notes: string().nullable(),
    circuit_assignments: array()
      .required()
      .min(1)
      .of(
        object({
          sets: number().required(),
          exercise_assignments: array()
            .required()
            .min(1)
            .of(
              object({
                modification_exercise_id: number().nullable(),
                sets: number()
                  .nullable()
                  .transform((value, originalValue) => (originalValue === 0 ? null : value)),
                amsap: boolean(),
                reps: number()
                  .nullable()
                  .transform((value, originalValue) => (originalValue === 0 ? null : value)),
                amrap: boolean(),
                weight: number()
                  .nullable()
                  .transform((value, originalValue) => (originalValue === 0 ? null : value)),
                percentage_of_e1rm: number()
                  .nullable()
                  .transform((value, originalValue) => (originalValue === 0 ? null : value))
                  .transform((value, originalValue) => (originalValue === 0 ? null : value)),
                percentage_of_last_set: number()
                  .nullable()
                  .transform((value, originalValue) => (originalValue === 0 ? null : value)),
                adjusted_weight: number().nullable(),
                duration: number().nullable(),
                rpe_target: number().nullable(),
                rest_period: number().nullable(),
              })
                .required()
                .test(
                  "xor-sets-amsap",
                  'You can only have "sets" if "amsap" is false, and vice versa.',
                  function (value) {
                    const { sets, amsap } = value;
                    if (amsap) {
                      return sets === null;
                    } else {
                      return sets !== null;
                    }
                  }
                )
                .test(
                  "xor-reps-amrap",
                  'You can only have "reps" if "amrap" is false, and vice versa.',
                  function (value) {
                    const { reps, amrap } = value;
                    if (amrap) {
                      return reps === null;
                    } else {
                      return reps !== null;
                    }
                  }
                )
                .test(
                  "oneOf-weight-percentageOfe1rm-percentageOfLastSet",
                  'You can only have oneOf "weight" if "percentage_of_last_set" or "percentage_of_e1rm"',
                  function (value) {
                    const { weight, percentage_of_e1rm, percentage_of_last_set } = value;
                    const count = [weight, percentage_of_last_set, percentage_of_e1rm].filter((v) => v != null).length;
                    return count === 1;
                  }
                )
            ),
        })
      ),
  }).required(),
});

type WorkoutData = InferType<typeof workoutDataSchema>;

interface ValidateWorkoutResponse {
  workoutData: WorkoutData | undefined;
  error: ValidationError | undefined;
}

export const validateWorkout = async (workoutData: WorkoutData): Promise<ValidateWorkoutResponse> => {
  try {
    await workoutDataSchema.validate(workoutData);
    return { workoutData: workoutData, error: undefined };
  } catch (err) {
    if (err instanceof ValidationError) {
      return { workoutData: undefined, error: err };
    }
    throw err;
  }
};
