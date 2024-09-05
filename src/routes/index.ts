import express from "express";
import { userControllers, workoutControllers, relationControllers } from "../controllers/index.js";
import { verifyJWT, validateRequest } from "../utils/index.js";

export const openRouter = express.Router();
export const authRouter = express.Router();

authRouter.use(verifyJWT);

// unprotected routes
openRouter.post("/register", userControllers.register);
openRouter.post("/login", userControllers.login);

// protected routes
authRouter.post("/exercise", validateRequest, workoutControllers.postExercise);
authRouter.post("/workout-assignment", validateRequest, workoutControllers.postWorkoutAssignment);
authRouter.post("/circuit-assignment", validateRequest, workoutControllers.postCircuitAssignment);
authRouter.post("/exercise-assignment", validateRequest, workoutControllers.postExerciseAssignment);

authRouter.put("/workout-assignment", validateRequest, workoutControllers.putWorkout);
authRouter.put("/circuit-assignment", validateRequest, workoutControllers.putCircuit);
authRouter.put("/exercise-assignment", validateRequest, workoutControllers.putExercise);
authRouter.post("/workout-result", validateRequest, workoutControllers.postWorkoutResult);

authRouter.post("/workout-assignment-template", validateRequest, workoutControllers.postWorkoutTemplate);
authRouter.post("/circuit-assignment-template", validateRequest, workoutControllers.postCircuitTemplate);
authRouter.post("/exercise-assignment-template", validateRequest, workoutControllers.postExerciseTemplate);

authRouter.get("/workouts/:id", validateRequest, workoutControllers.getWorkouts);
authRouter.put("/workout-assignment/:id", validateRequest, workoutControllers.putWorkout);
authRouter.put("/workout-result/:id", validateRequest, workoutControllers.putWorkoutResult);

// saving for future features
openRouter.post("/reset-password", validateRequest, userControllers.resetPassword);
openRouter.post("/password-reset", validateRequest, userControllers.passwordReset);
authRouter.post("/coach-client-relation", relationControllers.postCoachClientRelation);
authRouter.get("/coach-client-relation", relationControllers.getCoachClientRelation);
authRouter.put("/coach-client-relation", relationControllers.putCoachClientRelation);
