import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
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

export const verifyJWT = async (token: string): Promise<void | JwtPayload> => {
  try {
    if (!process.env.JWT_SECRET) {
      throw Error("Please define JWT_SECRET in .env");
    }
    const verify = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err || !decoded || typeof decoded === "string") {
        throw Error("Error verifying token");
      }
      return decoded;
    });
    return verify;
  } catch (err) {
    console.error(err);
    return;
  }
};
