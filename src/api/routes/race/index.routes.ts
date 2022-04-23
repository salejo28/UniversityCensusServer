import { Router } from "express";

import { RaceControllers } from "controllers";
import { Authenticate, StaffOnly, ValidateRace } from "middlewares";

class RaceRoutes {
  public router: Router;
  private controllers: RaceControllers;

  constructor() {
    this.router = Router({ strict: true });
    this.controllers = new RaceControllers();

    this.getRace();
    this.getRaces();
    this.searchRace();
    this.createRace();
    this.updateRace();
    this.deleteRace();
  }

  getRace() {
    this.router.get(
      "/:rid/",
      [Authenticate, StaffOnly],
      this.controllers.GetRace.bind(this.controllers)
    );
  }

  getRaces() {
    this.router.get(
      "/",
      [Authenticate, StaffOnly],
      this.controllers.GetRaces.bind(this.controllers)
    );
  }

  searchRace() {
    this.router.get(
      "/search",
      [Authenticate, StaffOnly],
      this.controllers.SearchRace.bind(this.controllers)
    );
  }

  createRace() {
    this.router.post(
      "/",
      [Authenticate, StaffOnly, ValidateRace],
      this.controllers.CreateRace.bind(this.controllers)
    );
  }

  updateRace() {
    this.router.put(
      "/:rid/",
      [Authenticate, StaffOnly],
      this.controllers.UpdateRace.bind(this.controllers)
    );
  }

  deleteRace() {
    this.router.delete(
      "/:rid/",
      [Authenticate, StaffOnly],
      this.controllers.DeleteRace.bind(this.controllers)
    );
  }
}

export default new RaceRoutes().router;
