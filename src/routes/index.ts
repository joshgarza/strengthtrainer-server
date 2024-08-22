import express from "express";
import {
  userControllers,
  workoutControllers,
  relationControllers,
} from "../controllers/index.js";

export const router = express.Router();

// router.get("/", controllers.test);

// User routes
router.post("/register", userControllers.register);
router.post("/login", userControllers.login);
router.post("/password-reset", userControllers.passwordReset);
router.post("/reset-password", userControllers.resetPassword);

// Workout routes
router.get("/workouts", workoutControllers.getWorkouts);
router.post("/workout-assignment", workoutControllers.postWorkout);
router.put("/workout-assignment", workoutControllers.putWorkout);
router.post("/workout-result", workoutControllers.postWorkoutResult);
router.put("/workout-result", workoutControllers.putWorkoutResult);

// Coach-Client relationships
router.post(
  "/coach-client-relation",
  relationControllers.postCoachClientRelation
);
router.get(
  "/coach-client-relation",
  relationControllers.getCoachClientRelation
);
router.put(
  "/coach-client-relation",
  relationControllers.putCoachClientRelation
);
