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
    this.router.get("/:tid", this.controllers.GetTypeId.bind(this.controllers));
  }

  getTypesId() {
    this.router.get("/", this.controllers.GetTypesId.bind(this.controllers));
  }

  createTypeId() {
    this.router.post("/", this.controllers.CreateTypeId.bind(this.controllers));
  }

  updateTypeId() {
    this.router.put(
      "/:tid",
      this.controllers.UpdateTypeId.bind(this.controllers)
    );
  }

  deleteTypeId() {
    this.router.delete(
      "/:tid",
      this.controllers.DeleteTypeId.bind(this.controllers)
    );
  }
}

export default new TypeIdRoutes().router;
