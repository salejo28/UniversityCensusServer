import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { SECRET_REFRESH_TOKEN, SECRET_TOKEN } from "keys";
import { AuthRequest, User } from "types";
import { UserModel } from "models";

export const AuthenticateApiVerify = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers["authorization"];
  if (!authorization || !authorization.trim()) {
    return res.status(401).send("Unauthorized");
  }

  next();
};

export const Authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const model = new UserModel();
    const refreshToken: string = req.cookies["x-token"] || "";
    const verifyToken: jwt.JwtPayload = jwt.verify(
      refreshToken,
      SECRET_TOKEN as string
    ) as jwt.JwtPayload;
    const user = await model.getById(verifyToken.uid);
    req.user = user as User;
    next();
    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    return res.status(401).send("Unathorized");
  }
};

export const StaffOnly = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user?.role === "client") {
      return res.status(403).send("I'm sorry you haven't access");
    }

    next();
  } catch (error) {
    return res.status(403).send("I'm sorry you haven't access");
  }
};

export const SignToken = (uid: number): string => {
  return jwt.sign({ uid }, SECRET_TOKEN as string, {
    expiresIn: "1m",
  });
};

export const SignRefreshToken = (uid: number): string => {
  return jwt.sign({ uid, refresh: true }, SECRET_REFRESH_TOKEN as string, {
    expiresIn: "1h",
  });
};
