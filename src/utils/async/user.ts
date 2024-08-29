import { userModels } from "../../models/index.js";
import { hashPassword, compareHash } from "./hashing.js";
import { Request, Response, NextFunction } from "express";

// interface RegisterUserData {
//   valid: boolean,
//   userData?: UserData,
//   error?: string
// }

export const checkPassword = async (email: string, password: string) => {
  // Retrieve the stored hash for the given email
  const hash = await userModels.getUserHash(email);

  // Check if hash exists (i.e., user exists)
  if (!hash) {
    // res.status(401).json({ message: "User not found" });
    return { valid: false, error: "Error: user does not exist" };
  }

  // Compare the provided password with the stored hash
  const hashesMatch = await compareHash(password, hash);

  if (hashesMatch) {
    // retrieve user information to be signed in JWT
    const userData = await userModels.getUserData(email);
    return { valid: true, userData };
  } else {
    return { valid: false, error: "Error: password does not match" };
  }
};

export const registerUser = async (username: string, email: string, password: string, role: string) => {
  try {
    console.log("attempting to register");
    const hash = await hashPassword(password);

    // Add new user to users table
    const userData = await userModels.register(username, email, hash, role);

    if (!userData) {
      return { valid: false, error: "Error creating new user" };
    } else {
      return { valid: true, userData };
    }
  } catch (err) {
    return { valid: false, error: err };
  }
};

// After decoding JWT, compare user id from JWT and resource id being requested
export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let id: string;
    if (req.method === "POST") {
      id = req.body.id;
    } else {
      id = req.params.id;
    }

    if (req.user?.id !== String(id)) {
      return res.status(403).json({ message: "Error authorizing request" });
    }

    next();
  } catch (err) {
    return res.status(403).json({ message: "Error authorizing request" });
  }
};
