declare module "workout-types" {
  export interface ExerciseAssignment {
    modification_exercise_id: number;
    sets: number;
    reps: number;
    weight: number;
    percentage_of_e1rm: number;
    percentage_of_last_set: number;
    adjusted_weight: number;
    duration: number;
    rpe_target: number;
    amrap: boolean;
    amsap: boolean;
    rest_period: number;
  }

  export interface CircuitAssignment {
    sets: number;
    exercise_assignments: ExerciseAssignment[];
  }

  export interface WorkoutAssignment {
    notes: string;
    circuit_assignments: CircuitAssignment[];
  }

  export interface WorkoutData {
    client_id: number;
    workout_date: Date;
    description: string;
    workout_assignment: WorkoutAssignment;
  }
}
