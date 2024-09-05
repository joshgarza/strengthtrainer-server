import { userModels } from "../../models/index.js";
import { hashPassword, compareHash } from "./hashing.js";

export const checkPassword = async (email: string, password: string) => {
  try {
    const hash = await userModels.getUserHash(email);
    await compareHash(password, hash);
    const userData = await userModels.getUserData(email);

    return userData;
  } catch (err) {
    throw err;
  }
};

export const registerUser = async (name: string, email: string, password: string, role: string) => {
  try {
    const hash = await hashPassword(password);
    const userData = await userModels.register(name, email, hash, role);

    return userData;
  } catch (err) {
    throw err;
  }
};
