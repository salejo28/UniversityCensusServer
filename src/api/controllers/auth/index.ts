import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { PRODUCTION, SECRET_REFRESH_TOKEN } from "keys";
import { AuthControllersUI } from "types";
import { AuthServices } from "services";
import { SignRefreshToken, SignToken } from "middlewares";

export default class AuthControllers implements AuthControllersUI {
  private authService: AuthServices;

  constructor() {
    this.authService = new AuthServices();
  }

  async Login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const uid = await this.authService.Login({ email, password });
    if (!uid) {
      return res.status(401).json({
        success: false,
        error: "Email or password incorrect",
      });
    }
    const token = SignToken(uid);
    const refreshToken = SignRefreshToken(uid);
    return res
      .cookie("x-token", token, {
        httpOnly: true,
        secure: PRODUCTION,
      })
      .cookie("x-refresh-token", refreshToken, {
        httpOnly: true,
        secure: PRODUCTION,
      })
      .json({
        success: true,
      });
  }

  async Register(req: Request, res: Response): Promise<Response> {
    const {
      email,
      firstName,
      middleName,
      surname,
      lastName,
      idType,
      idNumber,
      password,
    } = req.body;
    const payload = {
      email,
      firstName,
      middleName,
      surname,
      lastName,
      idType,
      idNumber,
      password,
    };
    const { success, id, path } = await this.authService.Register(payload);
    if (!success) {
      return res.json({
        success,
        errors: {
          path: [path],
          meessage:
            path === "email"
              ? "Email already exists"
              : "Identity already exists",
        },
      });
    }
    const token = SignToken(id);
    const refreshToken = SignRefreshToken(id);

    return res
      .cookie("x-token", token, {
        httpOnly: true,
        secure: PRODUCTION,
        signed: true,
      })
      .cookie("x-refresh-token", refreshToken, {
        httpOnly: true,
        secure: PRODUCTION,
        signed: true,
      })
      .json({
        success: true,
      });
  }

  async RefreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies["x-refresh-token"];
    try {
      const verifyToken: jwt.JwtPayload = jwt.verify(
        refreshToken,
        SECRET_REFRESH_TOKEN as string
      ) as jwt.JwtPayload;
      const time = (verifyToken.exp as number) * 1000;
      const now = new Date();
      const timeToExp = new Date(time);
      const difference = timeToExp.getTime() - now.getTime();
      const minutes = difference / (1000 * 60);
      if (minutes <= 5) {
        // Generate refresh token
        const generateRefreshToken = SignRefreshToken(verifyToken.uid);
        res.cookie("x-refresh-token", generateRefreshToken, {
          httpOnly: true,
          secure: PRODUCTION,
        });
      }
      const token = SignToken(verifyToken.uid);
      res.cookie("x-token", token, {
        httpOnly: true,
        secure: PRODUCTION,
      });
      return res.json({
        scucess: true,
      });
    } catch (error) {
      return res.status(403).send("Unauthorized");
    }
  }
}
