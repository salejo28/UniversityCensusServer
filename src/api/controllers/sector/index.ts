import { Response } from "express";

import { AuthRequest, SectorControllersUI, Sector } from "types";
import { SectorModel } from "models";

export default class SectorControllers implements SectorControllersUI {
  private readonly model: SectorModel;

  constructor() {
    this.model = new SectorModel();
  }

  public async GetSectors(req: AuthRequest, res: Response) {
    const sectors = await this.model.getAll();
    return res.json(
      sectors.map((sector: Sector) => {
        return {
          ...sector,
          isNeighborhood: sector.isNeighborhood === 1 ? true : false,
          isSidewalk: sector.isSidewalk === 1 ? true : false,
        };
      })
    );
  }

  public async GetSectorsAssigned(req: AuthRequest, res: Response) {
    const sectors = await this.model.getAssignedSectors();
    return res.json(
      sectors.map((sector: Sector) => {
        return {
          ...sector,
          isNeighborhood: sector.isNeighborhood === 1 ? true : false,
          isSidewalk: sector.isSidewalk === 1 ? true : false,
        };
      })
    );
  }

  public async GetSector(req: AuthRequest, res: Response) {
    const sector = await this.model.getById(req.params.sid);
    return res.json({
      ...sector,
      isNeighborhood: sector?.isNeighborhood === 1 ? true : false,
      isSidewalk: sector?.isSidewalk === 1 ? true : false,
    });
  }

  public async CreateSector(req: AuthRequest, res: Response) {
    const payload = req.body;
    const existsSector = await this.model.getOne({ name: payload.name });
    if (existsSector) {
      return res.json({
        success: false,
        error: "The sector is already exists",
      });
    }
    const existSameLocation = await this.model.verifyGeolocation(
      payload.start,
      payload.end
    );
    if (existSameLocation) {
      return res.json({
        success: false,
        error: "There is already a sector with the same geolocation",
      });
    }
    await this.model.create({
      ...payload,
      start: JSON.stringify(payload.start),
      end: JSON.stringify(payload.end),
    });
    return res.json({
      success: true,
      message: "Sector creared",
    });
  }

  public async AssignSector(req: AuthRequest, res: Response) {
    const payload = req.body;
    const officialWithSector = await this.model.checkOfficialWithSector(
      payload.official
    );
    if (officialWithSector) {
      return res.json({
        success: false,
        error: "The official is already has an assigned sector",
      });
    }
    const sectorWithOfficial = await this.model.verifySectorWithAssignation(
      payload.sector
    );
    if (sectorWithOfficial) {
      return res.json({
        success: false,
        error: "The sector already has an official assigned",
      });
    }

    await this.model.assignSectorToOfficial(payload.official, payload.sector);
    return res.json({
      success: true,
      message: "Assigned sector",
    });
  }

  public async UnAssignSector(req: AuthRequest, res: Response) {
    const id = req.params.sid;
    await this.model.unassignSectorOfOfficial(id);
    return res.json({
      success: true,
      message: "Sector unassigned",
    });
  }

  public async UpdateSector(req: AuthRequest, res: Response) {
    const id = req.params.sid;
    const payload = req.body;
    const races = await this.model.serachIfExistForUpdate(id, {
      name: payload.name,
    });
    if (races.length > 0) {
      return res.json({
        success: false,
        error: "Sector is already exist",
      });
    }
    await this.model.updateById(id, payload);
    return res.json({
      message: "Sector updated successfully",
      success: true,
    });
  }
}
