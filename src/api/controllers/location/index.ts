import { Response } from "express";

import { AuthRequest, LocationControllersUI } from "types";
import { LocationModel } from "models";

export default class LocationControllers implements LocationControllersUI {
  private model: LocationModel;

  constructor() {
    this.model = new LocationModel();
  }

  public async GetLocation(req: AuthRequest, res: Response) {
    const location = await this.model.getOne({ user: req.user?.id as number });
    return res.json({
      ...location,
      geo: JSON.parse(location?.geo),
    });
  }

  public async CreateLocation(req: AuthRequest, res: Response) {
    const payload = req.body;
    const existLocationByGeo = await this.model.verifyGeolocation(payload.geo);
    if (existLocationByGeo) {
      return res.json({
        success: false,
        error: "Location is already exists",
      });
    }
    const existLocationByAddress = await this.model.getOne({
      address: payload.address,
    });
    if (existLocationByAddress) {
      return res.json({
        success: false,
        error: "Location is already exists",
      });
    }
    await this.model.create({
      ...payload,
      user: req.user?.id,
      geo: JSON.stringify(payload.geo),
    });
    return res.json({
      success: true,
      message: "Address added",
    });
  }

  public async UpdateLocation(req: AuthRequest, res: Response) {
    const id = req.params.lid;
    const payload = req.body;
    if (payload.address) {
      const existAddress = await this.model.serachIfExistForUpdate(id, {
        address: payload.address,
      });
      if (existAddress.length > 0) {
        return res.json({
          sccuess: false,
          error: "Address is already exists",
        });
      }
    }

    if (payload.geo) {
      const existLocationByGeo = await this.model.serachIfExistForUpdate(id, {
        geo: JSON.stringify(payload.geo),
      });
      if (existLocationByGeo.length > 0) {
        return res.json({
          success: false,
          error: "Location is already exists",
        });
      }
      await this.model.updateById(id, {
        ...payload,
        geo: JSON.stringify(payload.geo),
      });
      return res.json({
        success: true,
        message: "Address updated",
      });
    }

    await this.model.updateById(id, payload);
    return res.json({
      success: true,
      message: "Address updated",
    });
  }
}
