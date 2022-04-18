import { Response } from "express";

import { AuthRequest, AnimalControllersUI } from "types";
import { AnimalModel } from "models";

export default class AnimalControllers implements AnimalControllersUI {
  private model: AnimalModel;

  constructor() {
    this.model = new AnimalModel();
  }

  public async GetAnimals(req: AuthRequest, res: Response) {
    const animals = await this.model.getAll();
    return res.json(animals);
  }

  public async GetAnimal(req: AuthRequest, res: Response) {
    const animal = await this.model.getById(req.params.aid);
    return res.json(animal);
  }

  public async GetAnimalByOwner(req: AuthRequest, res: Response) {
    const animals = await this.model.getByOwner(req.params.owner);
    return res.json(animals);
  }

  public async CreateAnimal(req: AuthRequest, res: Response) {
    const payload = req.body;
    const existAnimal = await this.model.getOne({
      name: payload.name,
      owner: payload.owner,
    });
    if (existAnimal) {
      return res.json({
        message: "Animal is already exists",
        success: true,
      });
    }

    await this.model.create(payload);
    return res.json({
      success: true,
      message: "Animal created",
    });
  }

  public async UpdateAnimal(req: AuthRequest, res: Response) {
    const id = req.params.aid;
    const payload = req.body;
    const races = await this.model.serachIfExistForUpdate(id, {
      name: payload.name,
      owner: payload.owner,
    });
    if (races.length > 0) {
      return res.json({
        success: false,
        error: "Animal is already exist",
      });
    }
    await this.model.updateById(id, payload);
    return res.json({
      message: "Animal updated successfully",
      success: true,
    });
  }
}
