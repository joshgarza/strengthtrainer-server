import { Request, Response, NextFunction } from "express";
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

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | JwtPayload> => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!process.env.JWT_SECRET || !token) {
      return res.status(403).json({
        message:
          "Insufficient data to authorize request. Please provide a valid token and secret.",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err || !decoded || typeof decoded === "string") {
        return res.status(401).json({ message: "Error verifying token" });
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
