import { Request, Response, NextFunction } from "express";

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
