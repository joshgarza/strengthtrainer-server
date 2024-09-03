import { client } from "../config/db.js";
import { WorkoutData } from "../utils/sync/validateWorkout.js";

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
      console.log(query, values);
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
