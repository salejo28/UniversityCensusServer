import { Request, Response } from "express";

export interface AuthControllersUI {
  Login: (req: Request, res: Response) => Promise<Response>;
  Register: (req: Request, res: Response) => Promise<Response>;
}

export interface TypeIdControllersUI {
  GetTypesId: (req: Request, res: Response) => Promise<Response>;
  GetTypeId: (req: Request, res: Response) => Promise<Response>;
  CreateTypeId: (req: Request, res: Response) => Promise<Response>;
  UpdateTypeId: (req: Request, res: Response) => Promise<Response>;
  DeleteTypeId: (req: Request, res: Response) => Promise<Response>;
}
