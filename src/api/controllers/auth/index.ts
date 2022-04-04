import { Request, Response } from "express";

import { PRODUCTION } from "app/keys";
import { AuthControllersUI } from "types";

export default class AuthControllers implements AuthControllersUI {
  async Login(req: Request, res: Response): Promise<Response> {
    return res
      .cookie("x-token", "sometoken", { httpOnly: true, secure: PRODUCTION })
      .cookie("another", "another", { httpOnly: true, secure: PRODUCTION })
      .json({
        message: "Hello Login",
      });
  }

  async Register(req: Request, res: Response): Promise<Response> {
    console.log(req.cookies);
    return res.json({
      message: "Hello Register",
    });
  }
}
