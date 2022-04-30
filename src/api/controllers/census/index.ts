import { Response } from "express";

import { AuthRequest, CensusControllersUI } from "types";
import { CensusModel } from "models";

export default class CensusControllers implements CensusControllersUI {
  private model: CensusModel;

  constructor() {
    this.model = new CensusModel();
  }

  async GetCensus(req: AuthRequest, res: Response) {
    const census = await this.model.getAll();
    return res.json(census);
  }

  async Report(req: AuthRequest, res: Response) {
    const { dateInit, dateEnd, sector } = req.body;
    const now = new Date();
    if (dateEnd) {
      if (now.getTime() < new Date(dateEnd).getTime()) {
        return res.json({
          success: false,
          errors: {
            path: ["date_census"],
            message: "Date must not be in the future",
          },
        });
      }
    }
    const census = await this.model.getReport(dateInit, sector, dateEnd);
    return res.json(census);
  }

  async GetOneCensus(req: AuthRequest, res: Response) {
    const census = await this.model.getById(req.params.cid);
    return res.json(census);
  }

  async MyReport(req: AuthRequest, res: Response) {
    const census = await this.model.getReportByOfficial(req.user?.id as number);
    return res.json(census);
  }

  async MakeCensus(req: AuthRequest, res: Response) {
    const payload = req.body;
    const existCensus = await this.model.existCensusWithSameAnimal(payload.pet);
    if (existCensus) {
      return res.json({
        success: false,
        errors: {
          path: ["animal"],
          message: "Animal was already registered",
        },
      });
    }
    await this.model.create({
      ...payload,
      official: req.user?.id,
    });
    return res.json({
      success: true,
      message: "Census created",
    });
  }

  public async UpdateCensus(req: AuthRequest, res: Response) {
    const date = req.body.date;
    const now = new Date();
    if (now.getTime() < new Date(date).getTime()) {
      return res.json({
        success: false,
        errors: {
          path: ["date_census"],
          message: "Date must not be in the future",
        },
      });
    }
    await this.model.updateById(req.params.cid, { date_census: date });
    return res.json({
      success: true,
      message: "Census updated",
    });
  }
}
