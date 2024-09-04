export const validateRequestData = async (schema: apiSchema, data: RequestData): Promise<RequestData> => {
  try {
    const validatedWorkoutData = await schema.validate(data);
    return validatedWorkoutData;
  } catch (err) {
    throw err;
  }
};
