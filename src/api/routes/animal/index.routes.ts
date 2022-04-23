import { Router } from "express";

import { AnimalControllers } from "controllers";
import { Authenticate, StaffOnly, ValidateAnimal } from "middlewares";
import { AnimalRoutesUI } from "types";

class AnimalRoutes implements AnimalRoutesUI {
  public router: Router;
  private controllers: AnimalControllers;

  constructor() {
    this.router = Router({ strict: true });
    this.controllers = new AnimalControllers();

    this.getAnimal();
    this.getAnimals();
    this.getAnimalByOwner();
    this.createAnimal();
    this.updateAnimal();
  }

  getAnimals() {
    this.router.get(
      "/",
      [Authenticate, StaffOnly],
      this.controllers.GetAnimals.bind(this.controllers)
    );
  }

  getAnimal() {
    this.router.get(
      "/:aid",
      [Authenticate],
      this.controllers.GetAnimal.bind(this.controllers)
    );
  }

  getAnimalByOwner() {
    this.router.get(
      "/:owner/",
      [Authenticate],
      this.controllers.GetAnimalByOwner.bind(this.controllers)
    );
  }

  createAnimal() {
    this.router.post(
      "/",
      [Authenticate, StaffOnly, ValidateAnimal],
      this.controllers.CreateAnimal.bind(this.controllers)
    );
  }

  updateAnimal() {
    this.router.put(
      "/:aid",
      [Authenticate],
      this.controllers.UpdateAnimal.bind(this.controllers)
    );
  }
}

export default new AnimalRoutes().router;
