import { NextFunction, Request, Response } from "express";

import {
  ValidateFormAnimal,
  ValidateFormCensus,
  ValidateFormLocation,
  ValidateFormLogin,
  ValidateFormNewUser,
  ValidateFormRace,
  ValidateFormRegister,
  ValidateFormScpecie,
  ValidateFormSector,
} from "validations";

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

export const ValidateNewUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;
  const { errors, valid } = ValidateFormNewUser(payload, req.body.role);
  if (!valid) {
    return res.json({
      success: false,
      errors,
    });
  }

  next();
};

export const ValidateSpecie = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;
  const { errors, valid } = ValidateFormScpecie(payload);
  if (!valid) {
    return res.json({
      success: false,
      errors,
    });
  }

  next();
};

export const ValidateRace = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;
  const { errors, valid } = ValidateFormRace(payload);
  if (!valid) {
    return res.json({
      success: false,
      errors,
    });
  }

  next();
};

export const ValidateAnimal = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;
  const { errors, valid } = ValidateFormAnimal(payload);
  if (!valid) {
    return res.json({
      success: false,
      errors,
    });
  }

  next();
};

export const ValidateSector = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;
  const { errors, valid } = ValidateFormSector(payload);
  if (!valid) {
    return res.json({
      success: false,
      errors,
    });
  }

  next();
};

export const ValidateLocation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;
  const { errors, valid } = ValidateFormLocation(payload);
  if (!valid) {
    return res.json({
      success: false,
      errors,
    });
  }

  next();
};

export const ValidateCensus = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;
  const { errors, valid } = ValidateFormCensus(payload);
  if (!valid) {
    return res.json({
      success: false,
      errors,
    });
  }

  next();
};
