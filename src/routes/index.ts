import express from "express";
import {
  userControllers,
  workoutControllers,
  relationControllers,
} from "../controllers/index.js";
import { verifyJWT } from "../utils/index.js";

export const router = express.Router();

// unprotected routes
router.post("/register", userControllers.register);
router.post("/login", userControllers.login);

router.use(verifyJWT);

// protected routes
router.post("/password-reset", userControllers.passwordReset);
router.post("/reset-password", userControllers.resetPassword);
router.get("/workouts", workoutControllers.getWorkouts);
router.post("/workout-assignment", workoutControllers.postWorkout);
router.put("/workout-assignment", workoutControllers.putWorkout);
router.post("/workout-result", workoutControllers.postWorkoutResult);
router.put("/workout-result", workoutControllers.putWorkoutResult);
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
