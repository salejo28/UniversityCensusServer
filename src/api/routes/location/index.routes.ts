import { Router } from "express";

import { LocationControllers } from "controllers";
import { Authenticate, ValidateLocation } from "middlewares";
import { LocationRoutesUI } from "types";

class LocationRoutes implements LocationRoutesUI {
  public router: Router;
  private controllers: LocationControllers;

  constructor() {
    this.router = Router();
    this.controllers = new LocationControllers();

    this.getLocation();
    this.createLocation();
    this.updateLocation();
    this.getByClient();
  }

  getByClient() {
    this.router.get(
      "/:cid",
      [Authenticate],
      this.controllers.GetByClient.bind(this.controllers)
    );
  }

  getLocation() {
    this.router.get(
      "/",
      [Authenticate],
      this.controllers.GetLocation.bind(this.controllers)
    );
  }

  createLocation() {
    this.router.post(
      "/",
      [Authenticate, ValidateLocation],
      this.controllers.CreateLocation.bind(this.controllers)
    );
  }

  updateLocation() {
    this.router.put(
      "/:lid",
      [Authenticate],
      this.controllers.UpdateLocation.bind(this.controllers)
    );
  }
}

export default new LocationRoutes().router;
