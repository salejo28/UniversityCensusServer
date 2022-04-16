import { Request, Response } from "express";

import { UserModel } from "models";
import { AuthRequest, UserControllerUI } from "types";
import { UserService } from "services";

export default class UserControllers implements UserControllerUI {
  private readonly userModel;
  private readonly service;

  constructor() {
    this.userModel = new UserModel();
    this.service = new UserService();
  }

  public async GetUser(req: Request, res: Response) {
    const user = await this.userModel.getById(req.params.uid);
    return res.json({
      user,
    });
  }

  public async CreateUser(req: AuthRequest, res: Response) {
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
    const { success, path } = await this.service.CreateUser(
      payload,
      req.body.role
    );
    if (!success) {
      return res.json({
        success,
        error:
          path === "email" ? "Email already exists" : "Identity already exists",
        path,
      });
    }
    return res.json({
      message: "User created!",
      success: true,
    });
  }
}
