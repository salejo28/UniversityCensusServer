import { Response } from "express";

import { AuthRequest, RaceControllersUI } from "types";
import { RaceModel } from "models";
import { Race } from "app/types/models";

export default class RaceControllers implements RaceControllersUI {
  private readonly model: RaceModel;

  constructor() {
    this.model = new RaceModel();
  }

  async GetRaces(req: AuthRequest, res: Response) {
    const races = await this.model.getAll();
    return res.json(
      races.map((race: Race) => {
        return {
          ...race,
          dangerous: race.dangerous === 0 ? false : true,
        };
      })
    );
  }

  async GetRace(req: AuthRequest, res: Response) {
    const race = await this.model.getById(req.params.rid);
    console.log(race);
    return res.json({
      ...race,
      dangerous: race.dangerous === 0 ? false : true,
    });
  }

  async SearchRace(req: AuthRequest, res: Response) {
    const keyword = req.query.keyword;
    const races = await this.model.SearchRace(keyword as string);
    return res.json(
      races.map((race: Race) => {
        return {
          ...race,
          dangerous: race.dangerous === 0 ? false : true,
        };
      })
    );
  }

  async CreateRace(req: AuthRequest, res: Response) {
    const payload = req.body;
    const existRace = await this.model.getOne({ name: payload.name });
    if (existRace) {
      return res.json({
        success: false,
        error: "Race is already exists",
      });
    }
    await this.model.create(payload);
    return res.json({
      message: "Race created successfully",
      success: true,
    });
  }

  async UpdateRace(req: AuthRequest, res: Response) {
    const id = req.params.rid;
    const payload = req.body;
    const races = await this.model.serachIfExistForUpdate(id, {
      name: payload.name,
    });
    if (races.length > 0) {
      return res.json({
        success: false,
        error: "Race is already exist",
      });
    }
    await this.model.updateById(id, payload);
    return res.json({
      message: "Race updated successfully",
      success: true,
    });
  }

  async DeleteRace(req: AuthRequest, res: Response) {
    await this.model.deleteById(req.params.rid);
    return res.json({
      message: "Race deleted successfully",
    });
  }
}
