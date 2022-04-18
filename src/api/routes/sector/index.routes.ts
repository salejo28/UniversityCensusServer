import { Router } from "express";

import { SectorControllers } from "controllers";
import { Authenticate, StaffOnly } from "middlewares";
import { SectorRoutesUI } from "types";

class SectorRoutes implements SectorRoutesUI {
  public router: Router;
  private controllers: SectorControllers;

  constructor() {
    this.router = Router({ strict: true });
    this.controllers = new SectorControllers();

    this.getSector();
    this.getSectors();
    this.createSector();
    this.assignSector();
    this.unassignSector();
    this.updateSector();
    this.getSectorsAssined();
  }

  getSectors() {
    this.router.get(
      "/",
      [Authenticate],
      this.controllers.GetSectors.bind(this.controllers)
    );
  }

  getSectorsAssined() {
    this.router.get(
      "/assigned/",
      [Authenticate, StaffOnly],
      this.controllers.GetSectorsAssigned.bind(this.controllers)
    );
  }

  getSector() {
    this.router.get(
      "/:sid",
      [Authenticate],
      this.controllers.GetSector.bind(this.controllers)
    );
  }

  createSector() {
    this.router.post(
      "/",
      [Authenticate, StaffOnly],
      this.controllers.CreateSector.bind(this.controllers)
    );
  }

  updateSector() {
    this.router.put(
      "/:sid",
      [Authenticate, StaffOnly],
      this.controllers.UpdateSector.bind(this.controllers)
    );
  }

  assignSector() {
    this.router.post(
      "/assign/",
      [Authenticate, StaffOnly],
      this.controllers.AssignSector.bind(this.controllers)
    );
  }

  unassignSector() {
    this.router.post(
      "/:sid",
      [Authenticate, StaffOnly],
      this.controllers.UnAssignSector.bind(this.controllers)
    );
  }
}

export default new SectorRoutes().router;
