import { client } from "../config/db.js";
import { WorkoutData, CircuitData } from "../types/lib.js";

export const workoutModels = {
  getWorkouts: async () => {},
  postWorkout: async (workoutData: WorkoutData) => {
    const query = `
      INSERT INTO workout_assignments (user_id, coach_id, workout_date, name, description, notes)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;
    const values = [
      workoutData.user_id,
      workoutData.coach_id,
      workoutData.workout_date,
      workoutData.name,
      workoutData.description,
      workoutData.notes,
    ];

    try {
      const res = await client.query(query, values);
      return res.rows[0];
    } catch (err) {
      throw err;
    }
  },
  postCircuit: async (circuitData: CircuitData) => {
    // first check what circuit position should be

    // const circuit_position = workoutModels.getCircuitPosition(circuitData.workout_assignment_id);
    const circuit_position = 0;
    const query = `
    INSERT INTO circuit_assignments (workout_assignment_id, circuit_position, sets, rest_period)
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `;
    const values = [circuitData.workout_assignment_id, circuit_position, circuitData.sets, circuitData.rest_period];

    try {
      const res = await client.query(query, values);
      return res.rows[0];
    } catch (err) {
      throw err;
    }
  },
  putWorkout: async () => {},
  postWorkoutResult: async () => {},
  putWorkoutResult: async () => {},
};
