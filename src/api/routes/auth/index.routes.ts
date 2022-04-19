import { Router } from "express";

import { AuthControllers } from "controllers";
import { AuthRoutesUI } from "types";
import { ValidateLogin, ValidateRegister } from "middlewares";

class AuthRoutes implements AuthRoutesUI {
  public router: Router;
  private controllers: AuthControllers;

  constructor() {
    this.router = Router();
    this.controllers = new AuthControllers();

    this.register();
    this.login();
    this.refrestToken();
  }

  register() {
    this.router.post(
      "/register",
      ValidateRegister,
      this.controllers.Register.bind(this.controllers)
    );
  }

  login() {
    this.router.post(
      "/login",
      ValidateLogin,
      this.controllers.Login.bind(this.controllers)
    );
  }

  refrestToken() {
    this.router.post(
      "/refresh-token",
      this.controllers.RefreshToken.bind(this.controllers)
    );
  }
}

export default new AuthRoutes().router;
