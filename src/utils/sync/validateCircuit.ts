import { object, array, string, number, date, boolean, InferType, ValidationError } from "yup";

const circuitDataSchema = object({
  user_id: string().required(),
  coach_id: string().required(),
  workout_assignment_id: string().required(),
  sets: string().required(),
  rest_period: number().default(0),
});

export type CircuitData = InferType<typeof circuitDataSchema>;

export const validateCircuit = async (circuitData: CircuitData): Promise<CircuitData> => {
  try {
    const validatedCircuitData = await circuitDataSchema.validate(circuitData);
    return validatedCircuitData;
  } catch (err) {
    throw err;
  }
};
