import { InferType, AnySchema } from "yup"; // Import `InferType` and `AnySchema`

export const validateRequestData = async <TSchema extends AnySchema>(
  schema: TSchema,
  data: unknown
): Promise<InferType<TSchema>> => {
  try {
    // Validate data and return the result with the inferred type based on the schema
    const validatedData = await schema.validate(data);
    return validatedData as InferType<TSchema>;
  } catch (err) {
    throw err;
  }
};
