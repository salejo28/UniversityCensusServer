import { Response } from "express";

import { AuthRequest, SpecieControllersUI, Specie } from "types";
import { SpecieModel } from "models";

export default class SpecieControllers implements SpecieControllersUI {
  private readonly model: SpecieModel;

  constructor() {
    this.model = new SpecieModel();
  }

  async GetSpecies(req: AuthRequest, res: Response) {
    const species = await this.model.getAll();
    return res.json(
      species.map((specie: Specie) => {
        return {
          ...specie,
          isPet: specie.isPet === 1 ? true : false,
        };
      })
    );
  }

  async GetSpecie(req: AuthRequest, res: Response) {
    const specie = await this.model.getById(req.params.sid);
    return res.json(specie);
  }

  async SearchSpecie(req: AuthRequest, res: Response) {
    const keyword = req.query.keyword;
    const species = await this.model.SearchSpecie(keyword as string);
    return res.json(species);
  }

  async CreateSpecie(req: AuthRequest, res: Response) {
    const existSpecie = await this.model.getOne({ name: req.body.name });
    if (existSpecie) {
      return res.json({
        success: false,
        error: "Specie is already exist",
      });
    }
    await this.model.create(req.body);
    return res.json({
      message: "Specie created successfully",
      success: true,
    });
  }

  async UpdateSpecie(req: AuthRequest, res: Response) {
    const id = req.params.sid;
    const payload = req.body;
    const specie = await this.model.serachIfExistForUpdate(id, {
      name: payload.name,
    });
    if (specie.length > 0) {
      return res.json({
        success: false,
        error: "Specie is already exist",
      });
    }
    await this.model.updateById(id, payload);
    return res.json({
      message: "Specie updated successfully",
      success: true,
    });
  }

  async DeleteSpecie(req: AuthRequest, res: Response) {
    await this.model.deleteById(req.params.sid);
    return res.json({
      message: "Specie deleted successfully",
    });
  }
}
