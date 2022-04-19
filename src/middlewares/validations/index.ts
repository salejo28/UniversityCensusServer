import { NextFunction, Request, Response } from "express";

import { ValidateFormLogin, ValidateFormRegister } from "validations";

export const ValidateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;
  const { errors, valid } = ValidateFormLogin(payload);
  if (!valid) {
    return res.json({
      success: false,
      errors,
    });
  }

  next();
};

export const ValidateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;
  const { errors, valid } = ValidateFormRegister(payload);
  if (!valid) {
    return res.json({
      success: false,
      errors,
    });
  }

  next();
};
