import jsonwebtoken, { Jwt } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwt = jsonwebtoken;

interface UserData {
  id: string;
  username: string;
  email: string;
  role: string;
}

export const signJWT = async (payload: UserData): Promise<string> => {
  try {
    if (!process.env.JWT_SECRET) {
      throw Error("Please define JWT_SECRET in .env");
    }
    return jwt.sign(payload, process.env.JWT_SECRET);
  } catch (err) {
    throw err;
  }
};
