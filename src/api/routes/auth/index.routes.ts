import { Router } from "express";

import { AuthControllers } from "controllers";
import { AuthRoutesUI } from "types";

class AuthRoutes implements AuthRoutesUI {
  public router: Router;
  private controllers: AuthControllers;

  constructor() {
    this.router = Router();
    this.controllers = new AuthControllers();

    this.register();
    this.login();
  }

  register() {
    this.router.post("/register", this.controllers.Register);
  }

  login() {
    this.router.post("/login", this.controllers.Login);
  }
}

export default new AuthRoutes().router;
