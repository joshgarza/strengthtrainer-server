import { client } from "../config/db.js";

const parent_id: Record<string, string> = {
  workout_assignments: "program_assignment_id",
  circuit_assignments: "workout_assignment_id",
  exercise_assignments: "circuit_assignment_id",
};

export const workoutModels = {
  findLastPosition: async (table: keyof typeof parent_id, parent_assignment_id: number | null): Promise<number> => {
    const parentIdColumn = parent_id[table];

    // Ensure the column exists in the parent_id map
    if (!parentIdColumn) {
      throw new Error(`Invalid table name: ${table}`);
    }

    const positionQuery = `
      SELECT MAX(position) FROM ${table} WHERE ${parentIdColumn}=$1
    `;

    const queryRes = await client.query(positionQuery, [parent_assignment_id]);
    const lastPosition = queryRes.rows[0].max;

    return lastPosition === null ? 0 : lastPosition + 1;
  },
  getWorkouts: async () => {},
  postExercise: async (exercise: Exercise) => {
    const query = `
      INSERT INTO exercises (user_id, name, description, difficulty)
    `;
    const values = [exercise.user_id, exercise.name, exercise.description, exercise.difficulty];

    try {
      const res = await client.query(query, values);
      return res.rows[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  postWorkoutAssignment: async (workoutAssignment: WorkoutAssignment) => {
    const nextPosition = await workoutModels.findLastPosition(
      "workout_assignments",
      workoutAssignment.program_assignment_id
    );
    const query = `
      INSERT INTO workout_assignments (user_id, coach_id, program_assignment_id, workout_assignment_template_id, workout_date, position, name, description, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id
    `;
    const values = [
      workoutAssignment.user_id,
      workoutAssignment.coach_id,
      workoutAssignment.program_assignment_id,
      workoutAssignment.workout_assignment_template_id,
      workoutAssignment.workout_date,
      nextPosition,
      workoutAssignment.name,
      workoutAssignment.description,
      workoutAssignment.notes,
    ];

    try {
      const res = await client.query(query, values);
      return res.rows[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  postCircuitAssignment: async (circuitAssignment: CircuitAssignment) => {
    const nextPosition = await workoutModels.findLastPosition(
      "circuit_assignments",
      circuitAssignment.workout_assignment_id
    );

    const query = `
    INSERT INTO circuit_assignments (workout_assignment_id, circuit_assignment_template_id, position, sets, rest_period)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
    `;
    const values = [
      circuitAssignment.workout_assignment_id,
      circuitAssignment.circuit_assignment_template_id,
      nextPosition,
      circuitAssignment.sets,
      circuitAssignment.rest_period,
    ];

    try {
      const res = await client.query(query, values);
      return res.rows[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  postExerciseAssignment: async (exerciseAssignment: ExerciseAssignment) => {
    // first check what circuit position should be
    console.log(exerciseAssignment.position, "in postExercise");
    exerciseAssignment.position = await workoutModels.findLastPosition(
      "exercise_assignments",
      exerciseAssignment.circuit_assignment_id
    );

    console.log(exerciseAssignment.position, "in postExercise");
    const query = `
    INSERT INTO exercise_assignments (circuit_assignment_id, exercise_assignment_template_id, exercise_id, position, sets, reps, weight, percentage_of_e1rm, percentage_of_last_set, adjusted_weight, rpe_target, amrap, amsap, duration, rest_period)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    RETURNING *
    `;
    const values = [
      exerciseAssignment.circuit_assignment_id,
      exerciseAssignment.exercise_assignment_template_id,
      exerciseAssignment.exercise_id,
      exerciseAssignment.position,
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
      console.error(err);
      throw err;
    }
  },
  putWorkout: async () => {},
  postWorkoutResult: async () => {},
  putWorkoutResult: async () => {},
};
