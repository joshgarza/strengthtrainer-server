import express from "express";
import { userControllers, workoutControllers, relationControllers } from "../controllers/index.js";
import { verifyJWT, validateUser } from "../utils/index.js";

export const router = express.Router();

// unprotected routes
router.post("/register", userControllers.register);
router.post("/login", userControllers.login);

router.use(verifyJWT);
// router.use(validateUser);

// protected routes
router.post("/workout-assignment", validateUser, workoutControllers.postWorkout);
router.post("/workout-result", validateUser, workoutControllers.postWorkoutResult);
router.get("/workouts/:id", validateUser, workoutControllers.getWorkouts);
router.put("/workout-assignment/:id", validateUser, workoutControllers.putWorkout);
router.put("/workout-result/:id", validateUser, workoutControllers.putWorkoutResult);

// saving for future features
router.post("/reset-password", validateUser, userControllers.resetPassword);
router.post("/password-reset", validateUser, userControllers.passwordReset);
router.post("/coach-client-relation", relationControllers.postCoachClientRelation);
router.get("/coach-client-relation", relationControllers.getCoachClientRelation);
router.put("/coach-client-relation", relationControllers.putCoachClientRelation);
