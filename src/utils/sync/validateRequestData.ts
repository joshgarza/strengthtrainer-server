// import { object, array, string, number, date, boolean, InferType, ObjectSchema, ValidationError } from "yup";
// import { WorkoutData, workoutDataSchema } from "./validateWorkout.js";

// type RequestData = WorkoutData;
// type YupSchema = typeof workoutDataSchema;

// export const validateData = async (schema: YupSchema, data: RequestData): Promise<RequestData> => {
//   try {
//     const validatedWorkoutData = await schema.validate(data);
//     return validatedWorkoutData;
//   } catch (err) {
//     throw err;
//   }
// };
