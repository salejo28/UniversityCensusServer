import { Request, Response } from "express";

import { TypeIdModel } from "models";
import { TypeIdControllersUI } from "types";

export default class TypeIdControllers implements TypeIdControllersUI {
  public async GetTypesId(req: Request, res: Response): Promise<Response> {
    try {
      const model = new TypeIdModel();
      const typesId = await model.getAll();
      return res.json(typesId);
    } catch (error) {
      console.error("Error GetTypesId =>", error);
      throw new Error(error as string);
    }
  }

  public async GetTypeId(req: Request, res: Response): Promise<Response> {
    try {
      const model = new TypeIdModel();
      await model.getOne({
        tipo_documento: "Cedula",
      });
      return res.send("Types");
    } catch (error) {
      console.error("Error GetTypesId =>", error);
      throw new Error(error as string);
    }
  }

  public async CreateTypeId(req: Request, res: Response): Promise<Response> {
    try {
      console.log(req, res);
      return res.send("Types");
    } catch (error) {
      console.error("Error GetTypesId =>", error);
      throw new Error(error as string);
    }
  }

  public async UpdateTypeId(req: Request, res: Response): Promise<Response> {
    try {
      console.log(req, res);
      return res.send("Types");
    } catch (error) {
      console.error("Error GetTypesId =>", error);
      throw new Error(error as string);
    }
  }

  public async DeleteTypeId(req: Request, res: Response): Promise<Response> {
    try {
      console.log(req, res);
      return res.send("Types");
    } catch (error) {
      console.error("Error GetTypesId =>", error);
      throw new Error(error as string);
    }
  }
}
