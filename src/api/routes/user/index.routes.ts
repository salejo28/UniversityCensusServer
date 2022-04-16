import { Router } from "express";

import { UserControllers } from "controllers";
import { UserRoutesUI } from "types";
import { Authenticate, StaffOnly } from "middlewares";

class UserRoutes implements UserRoutesUI {
  public router: Router;
  private controllers: UserControllers;

  constructor() {
    this.router = Router();
    this.controllers = new UserControllers();

    this.getUser();
    this.createUser();
  }

  getUser() {
    this.router.get(
      "/:uid",
      [Authenticate],
      this.controllers.GetUser.bind(this.controllers)
    );
  }

  createUser() {
    this.router.post(
      "/",
      [Authenticate, StaffOnly],
      this.controllers.CreateUser.bind(this.controllers)
    );
  }
}

export default new UserRoutes().router;
