import { QueryResult } from "pg";
import { client } from "../config/db.js";

const ref_id: Record<string, string> = {
  workout_assignments: "program_assignment_id",
  circuit_assignments: "workout_assignment_id",
  exercise_assignments: "circuit_assignment_id",
  exercise_assignment_results: "exercise_assignment_id",
};

type Table = "exercise_assignment_results" | "workout_assignments" | "circuit_assignments" | "exercise_assignments";

export const workoutModels = {
  findNextPosition: async (table: keyof typeof ref_id, parent_assignment_id: number | null): Promise<number> => {
    const parentIdColumn = ref_id[table];

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
      INSERT INTO exercises (user_id, name, description, difficulty) VALUES ($1, $2, $3, $4) RETURNING *
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
    const nextPosition = await workoutModels.findNextPosition(
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
    const nextPosition = await workoutModels.findNextPosition(
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
  postExerciseAssignment: async (exerciseAssignment: ExerciseAssignment): Promise<QueryResult> => {
    try {
      await client.query("BEGIN");
      exerciseAssignment.position = await workoutModels.findNextPosition(
        "exercise_assignments",
        exerciseAssignment.circuit_assignment_id
      );

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
      const res = await client.query(query, values);
      // post exercise_assignment_result as empty values
      await workoutModels.postExerciseAssignmentResult(exerciseAssignment.user_id, res.rows[0].id);
      // on success return the exercise_assignment
      await client.query("COMMIT");
      return res.rows[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  postExerciseAssignmentResult: async (userId: number, workoutAssignmentId: number): Promise<void> => {
    try {
      const query = `
        INSERT INTO exercise_assignment_results (user_id, exercise_assignment_id)
        VALUES ($1, $2)
        RETURNING id
      `;
      const values = [userId, workoutAssignmentId];
      await client.query(query, values);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  putExerciseAssignmentResult: async (exerciseAssignmentResult: ExerciseAssignmentResult) => {
    try {
      return await workoutModels.patchTable("exercise_assignment_results", exerciseAssignmentResult);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  putWorkout: async () => {},
  patchTable: async (table: Table, data: ValidatedData) => {
    // todo: abstract out ignoreList somehow so patchTable is agnostic of the table and data coming in
    const ignoreList = ["user_id", "exercise_assignment_id"];
    const queryList = [`UPDATE ${table}`];
    queryList.push("SET");

    const set: string[] = [];
    const keyOrder: string[] = [];

    Object.keys(data)
      .filter((key) => {
        const typedKey = key as keyof ValidatedData;
        return data[typedKey] !== null && !ignoreList.includes(typedKey);
      })
      .forEach((key, i) => {
        const typedKey = key as keyof ValidatedData;
        set.push(`${key}=$${i + 1}`);
        keyOrder.push(key);
      });

    queryList.push(set.join(", "));
    set.push(ref_id[table]);
    keyOrder.push(ref_id[table]);
    queryList.push(`WHERE ${ref_id[table]}=$${keyOrder.length}`);

    const values: number[] | string[] = keyOrder.map((key) => {
      const typedKey = key as keyof ValidatedData;
      return data[typedKey];
    });
    const query = queryList.join(" ");

    const res = await client.query(query, values);
    return res.rows[0];
  },
};
