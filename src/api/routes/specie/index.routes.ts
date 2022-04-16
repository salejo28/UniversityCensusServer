import { Router } from "express";

import { SpecieControllers } from "controllers";
import { SpecieRoutesUI } from "types";
import { Authenticate, StaffOnly } from "middlewares";

class SpecieRoutes implements SpecieRoutesUI {
  public router: Router;
  private controllers: SpecieControllers;

  constructor() {
    this.router = Router({ strict: true });
    this.controllers = new SpecieControllers();

    this.getSpecies();
    this.getSpecie();
    this.searchSpecie();
    this.createSpecie();
    this.updateSpecie();
    this.deleteSpecie();
  }

  getSpecies() {
    this.router.get(
      "/",
      [Authenticate, StaffOnly],
      this.controllers.GetSpecies.bind(this.controllers)
    );
  }

  getSpecie() {
    this.router.get(
      "/:sid/",
      [Authenticate, StaffOnly],
      this.controllers.GetSpecie.bind(this.controllers)
    );
  }

  searchSpecie() {
    this.router.get(
      "/search",
      [Authenticate, StaffOnly],
      this.controllers.SearchSpecie.bind(this.controllers)
    );
  }

  createSpecie() {
    this.router.post(
      "/",
      [Authenticate, StaffOnly],
      this.controllers.CreateSpecie.bind(this.controllers)
    );
  }

  updateSpecie() {
    this.router.put(
      "/:sid",
      [Authenticate, StaffOnly],
      this.controllers.UpdateSpecie.bind(this.controllers)
    );
  }

  deleteSpecie() {
    this.router.delete(
      "/:sid",
      [Authenticate, StaffOnly],
      this.controllers.DeleteSpecie.bind(this.controllers)
    );
  }
}

export default new SpecieRoutes().router;
