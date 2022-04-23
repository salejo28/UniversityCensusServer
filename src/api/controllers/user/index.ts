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
        errors: {
          path: [path],
          message:
            path === "email"
              ? "Email already exists"
              : "Identity already exists",
        },
      });
    }
    return res.json({
      message: "User created!",
      success: true,
    });
  }

  public async UpdateBirthDate(req: AuthRequest, res: Response) {
    const birthDate = req.body.birthDate;
    const date = new Date(birthDate);
    const now = new Date();
    const difference = now.getTime() - date.getTime();
    const year = 1000 * 60 * 60 * 24 * 365.25;
    const age = difference / year;
    if (age < 18) {
      return res.json({
        errors: {
          path: ["birthDate"],
          message: "You are not of legal age",
        },
        success: false,
      });
    }
    /* TODO: Update user birth date */
    return res.json({ message: "updated" });
  }

  public async UploadFile(req: AuthRequest, res: Response) {
    return res.json({ message: "uploaded" });
  }

  public async ListOfficials(req: AuthRequest, res: Response) {
    return res.json({ message: "list" });
  }

  public async UpdateInfoUser(req: AuthRequest, res: Response) {
    return res.json({ message: "" });
  }

  public async AddAdditionalInfoOfficial(req: AuthRequest, res: Response) {
    return res.json({ message: "" });
  }
}
