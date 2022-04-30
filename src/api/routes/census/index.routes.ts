import { Router } from "express";

import { CensusControllers } from "controllers";
import { CensusRoutesUI } from "types";
import {
  AdminOrBossOnly,
  Authenticate,
  StaffOnly,
  ValidateCensus,
} from "middlewares";

class CensusRoutes implements CensusRoutesUI {
  public router: Router;
  private controllers: CensusControllers;

  constructor() {
    this.router = Router({ strict: true });
    this.controllers = new CensusControllers();

    this.getCensus();
    this.myReport();
    this.makeCensus();
    this.updateCensus();
    this.getOneCensus();
    this.report();
  }

  getCensus() {
    this.router.get(
      "/",
      [Authenticate, StaffOnly],
      this.controllers.GetCensus.bind(this.controllers)
    );
  }

  report() {
    this.router.post(
      "/report",
      [Authenticate, AdminOrBossOnly],
      this.controllers.Report.bind(this.controllers)
    );
  }

  getOneCensus() {
    this.router.get(
      "/:cid",
      [Authenticate, StaffOnly],
      this.controllers.GetOneCensus.bind(this.controllers)
    );
  }

  myReport() {
    this.router.get(
      "/my-report/",
      [Authenticate, StaffOnly],
      this.controllers.MyReport.bind(this.controllers)
    );
  }

  makeCensus() {
    this.router.post(
      "/",
      [Authenticate, StaffOnly, ValidateCensus],
      this.controllers.MakeCensus.bind(this.controllers)
    );
  }

  updateCensus() {
    this.router.put(
      "/:cid",
      [Authenticate, StaffOnly],
      this.controllers.UpdateCensus.bind(this.controllers)
    );
  }
}

export default new CensusRoutes().router;
