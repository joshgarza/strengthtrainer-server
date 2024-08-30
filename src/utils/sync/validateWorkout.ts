// import { WorkoutData } from "workout-types";
import { object, array, string, number, date, boolean, InferType, ValidationError } from "yup";

// Transformation to cast 0 to null
const castZeroToNull = (value: any, originalValue: any) => (originalValue === 0 ? null : value);

// XOR validation function
const xorValidation = (field1: string, field2: string) => {
  return function (value: any) {
    const fieldValue1 = value[field1];
    const fieldValue2 = value[field2];

    if (fieldValue1 !== null) {
      return fieldValue2 === false;
    } else {
      return fieldValue2 !== false;
    }
  };
};

// OneOf validation function
const oneOfValidation = (fields: string[]) => {
  return function (value: any) {
    const count = fields.filter((field) => value[field] != null).length;
    return count === 1;
  };
};

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
                sets: number().nullable().transform(castZeroToNull),
                amsap: boolean(),
                reps: number().nullable().transform(castZeroToNull),
                amrap: boolean(),
                weight: number().nullable().transform(castZeroToNull),
                percentage_of_e1rm: number().nullable().transform(castZeroToNull).transform(castZeroToNull),
                percentage_of_last_set: number().nullable().transform(castZeroToNull),
                adjusted_weight: number().nullable(),
                duration: number().nullable(),
                rpe_target: number().nullable(),
                rest_period: number().nullable(),
              })
                .required()
                .test(
                  "xor-sets-amsap",
                  'You can only have "sets" if "amsap" is false, and vice versa.',
                  xorValidation("sets", "amsap")
                )
                .test(
                  "xor-reps-amrap",
                  'You can only have "reps" if "amrap" is false, and vice versa.',
                  xorValidation("reps", "amrap")
                )
                .test(
                  "oneOf-weight-percentageOfe1rm-percentageOfLastSet",
                  'You can only have oneOf "weight" if "percentage_of_last_set" or "percentage_of_e1rm"',
                  oneOfValidation(["weight", "percentage_of_e1rm", "percentage_of_last_set"])
                )
            ),
        })
      ),
  }).required(),
});

type WorkoutData = InferType<typeof workoutDataSchema>;

export const validateWorkout = async (workoutData: WorkoutData): Promise<WorkoutData | ValidationError> => {
  try {
    await workoutDataSchema.validate(workoutData);
    return workoutData;
  } catch (err) {
    throw err;
  }
};
