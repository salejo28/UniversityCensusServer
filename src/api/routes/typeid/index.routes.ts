import { Router } from "express";

import { TypeIdControllers } from "controllers";
import { TypeIdRoutesUI } from "types";

class TypeIdRoutes implements TypeIdRoutesUI {
  public router: Router;
  private controllers: TypeIdControllers;

  constructor() {
    this.router = Router({ strict: true });
    this.controllers = new TypeIdControllers();

    this.getTypesId();
    this.getTypeId();
    this.createTypeId();
    this.updateTypeId();
    this.deleteTypeId();
  }

  getTypeId() {
    this.router.get("/one/", this.controllers.GetTypeId);
  }

  getTypesId() {
    this.router.get("/", this.controllers.GetTypesId);
  }

  createTypeId() {
    this.router.post("/", this.controllers.CreateTypeId);
  }

  updateTypeId() {
    this.router.put("/:tid", this.controllers.UpdateTypeId);
  }

  deleteTypeId() {
    this.router.delete("/:tid", this.controllers.DeleteTypeId);
  }
}

export default new TypeIdRoutes().router;
