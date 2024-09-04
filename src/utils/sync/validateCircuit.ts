import { object, array, string, number, date, boolean, InferType, ValidationError } from "yup";

const castNullToZero = (value: any, originalValue: any) => (originalValue === null ? 0 : value);

const circuitDataSchema = object({
  user_id: number().required(),
  coach_id: number().required(),
  workout_assignment_id: number().required(),
  circuit_assignment_template_id: number().nullable().default(null),
  sets: number().required(),
  rest_period: number().nullable().transform(castNullToZero),
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
