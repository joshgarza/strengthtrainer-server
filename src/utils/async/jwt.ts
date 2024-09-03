import { Request, Response, NextFunction } from "express";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
const jwt = jsonwebtoken;

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  authorizedUserIds: number[];
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

export const verifyJWT = async (req: Request, res: Response, next: NextFunction): Promise<void | JwtPayload> => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!process.env.JWT_SECRET || !token) {
      return res.status(403).json({
        message: "Insufficient data to authorize request. Please provide a valid token and secret.",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err || !decoded || typeof decoded === "string") {
        return res.status(401).json({ message: "Error verifying token" });
      }
      // decoding id coerces it into a number by default. Coercing it back to a string.
      decoded.id = String(decoded.id);
      req.user = decoded;
      console.log(decoded);
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// After decoding JWT, compare user id from JWT and resource id being requested
export const validateRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user_id: string;
    if (req.method === "POST") {
      user_id = req.body.user_id;
    } else {
      user_id = req.params.user_id;
    }

    if (!req.user?.authorizedUserIds.includes(user_id)) {
      return res.status(403).json({ message: "Error authorizing request" });
    }

    next();
  } catch (err) {
    return res.status(403).json({ message: "Error authorizing request" });
  }
};
