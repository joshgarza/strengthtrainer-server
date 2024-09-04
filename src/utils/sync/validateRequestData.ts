import { Schema, Data } from "../../types/lib.js";

export const validateRequestData = async (schema: Schema, data: Data): Promise<Data> => {
  try {
    const validatedWorkoutData = await schema.validate(data);
    return validatedWorkoutData;
  } catch (err) {
    throw err;
  }
};
