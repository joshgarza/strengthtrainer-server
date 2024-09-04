import { client } from "../config/db.js";

export const workoutModels = {
  getWorkouts: async () => {},
  postWorkout: async (workoutAssignment: WorkoutAssignment) => {
    // todo: determine workoutPosition based on workouts of same date. default is to increment position by 1
    const workoutPosition = 0;
    const query = `
      INSERT INTO workout_assignments (user_id, coach_id, program_assignment_id, workout_assignment_template_id, workout_date, workout_position, name, description, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id
    `;
    const values = [
      workoutAssignment.user_id,
      workoutAssignment.coach_id,
      workoutAssignment.program_assignment_id,
      workoutAssignment.workout_assignment_template_id,
      workoutAssignment.workout_date,
      workoutPosition,
      workoutAssignment.name,
      workoutAssignment.description,
      workoutAssignment.notes,
    ];

    try {
      const res = await client.query(query, values);
      return res.rows[0];
    } catch (err) {
      throw err;
    }
  },
  postCircuit: async (circuitAssignment: CircuitAssignment) => {
    // first check what circuit position should be

    // const circuit_position = workoutModels.getCircuitPosition(circuitAssignment.workout_assignment_id);
    const circuit_position = 0;
    const query = `
    INSERT INTO circuit_assignments (workout_assignment_id, circuit_assignment_template_id, circuit_position, sets, rest_period)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
    `;
    const values = [
      circuitAssignment.workout_assignment_id,
      circuitAssignment.circuit_assignment_template_id,
      circuit_position,
      circuitAssignment.sets,
      circuitAssignment.rest_period,
    ];

    try {
      const res = await client.query(query, values);
      return res.rows[0];
    } catch (err) {
      throw err;
    }
  },
  postExercise: async (exerciseAssignment: ExerciseAssignment) => {
    // first check what circuit position should be

    // const circuit_position = workoutModels.getCircuitPosition(circuitAssignment.workout_assignment_id);
    // const circuit_position = 0;
    const query = `
    INSERT INTO exercise_assignments (circuit_assignment_id, exercise_assignment_template_id, exercise_id, exercise_position, sets, reps, weight, percentage_of_e1rm, percentage_of_last_set, adjusted_weight, rpe_target, amrap, amsap, duration, rest_period)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    RETURNING *
    `;
    const values = [
      exerciseAssignment.circuit_assignment_id,
      exerciseAssignment.exercise_assignment_template_id,
      exerciseAssignment.exercise_id,
      // exerciseAssignment.exercise_position,
      0,
      exerciseAssignment.sets,
      exerciseAssignment.reps,
      exerciseAssignment.weight,
      exerciseAssignment.percentage_of_e1rm,
      exerciseAssignment.percentage_of_last_set,
      exerciseAssignment.adjusted_weight,
      exerciseAssignment.rpe_target,
      exerciseAssignment.amrap,
      exerciseAssignment.amsap,
      exerciseAssignment.duration,
      exerciseAssignment.rest_period,
    ];
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
