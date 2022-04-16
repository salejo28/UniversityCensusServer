import { Request, Response } from "express";
import { AuthRequest } from "types";
export interface AuthControllersUI {
  Login: (req: Request, res: Response) => Promise<Response>;
  Register: (req: Request, res: Response) => Promise<Response>;
  RefreshToken: (req: Request, res: Response) => Promise<Response>;
}

export interface TypeIdControllersUI {
  GetTypesId: (req: Request, res: Response) => Promise<Response>;
  GetTypeId: (req: Request, res: Response) => Promise<Response>;
  CreateTypeId: (req: Request, res: Response) => Promise<Response>;
  UpdateTypeId: (req: Request, res: Response) => Promise<Response>;
  DeleteTypeId: (req: Request, res: Response) => Promise<Response>;
}

export interface UserControllerUI {
  GetUser: (req: Request, res: Response) => Promise<Response>;
  CreateUser: (req: AuthRequest, res: Response) => Promise<Response>;
}

export interface SpecieControllersUI {
  GetSpecies: (req: AuthRequest, res: Response) => Promise<Response>;
  GetSpecie: (req: AuthRequest, res: Response) => Promise<Response>;
  SearchSpecie: (req: AuthRequest, res: Response) => Promise<Response>;
  CreateSpecie: (req: AuthRequest, res: Response) => Promise<Response>;
  UpdateSpecie: (req: AuthRequest, res: Response) => Promise<Response>;
  DeleteSpecie: (req: AuthRequest, res: Response) => Promise<Response>;
}

export interface RaceControllersUI {
  GetRaces: (req: AuthRequest, res: Response) => Promise<Response>;
  GetRace: (req: AuthRequest, res: Response) => Promise<Response>;
  SearchRace: (req: AuthRequest, res: Response) => Promise<Response>;
  CreateRace: (req: AuthRequest, res: Response) => Promise<Response>;
  UpdateRace: (req: AuthRequest, res: Response) => Promise<Response>;
  DeleteRace: (req: AuthRequest, res: Response) => Promise<Response>;
}
