import { Request, Response } from "express";
import { AuthRequest } from "types";
export interface AuthControllersUI {
  Login: (req: Request, res: Response) => Promise<Response>;
  Register: (req: Request, res: Response) => Promise<Response>;
  RefreshToken: (req: Request, res: Response) => Promise<Response>;
  Logout: (req: Request, res: Response) => Promise<Response>;
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
  UpdateBirthDate: (req: AuthRequest, res: Response) => Promise<Response>;
  UploadFile: (req: AuthRequest, res: Response) => Promise<Response>;
  ListOfficials: (req: AuthRequest, res: Response) => Promise<Response>;
  UpdateInfoUser: (req: AuthRequest, res: Response) => Promise<Response>;
  AddAdditionalInfoOfficial: (
    req: AuthRequest,
    res: Response
  ) => Promise<Response>;
  UpdateAdditionalInfoOfficial: (
    req: AuthRequest,
    res: Response
  ) => Promise<Response>;
  Profile: (req: AuthRequest, res: Response) => Promise<Response>;
  Search?: (req: AuthRequest, res: Response) => Promise<Response>;
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

export interface AnimalControllersUI {
  GetAnimals: (req: AuthRequest, res: Response) => Promise<Response>;
  GetAnimal: (req: AuthRequest, res: Response) => Promise<Response>;
  CreateAnimal: (req: AuthRequest, res: Response) => Promise<Response>;
  UpdateAnimal: (req: AuthRequest, res: Response) => Promise<Response>;
  GetAnimalByOwner: (req: AuthRequest, res: Response) => Promise<Response>;
}

export interface SectorControllersUI {
  GetSectors: (req: AuthRequest, res: Response) => Promise<Response>;
  GetSector: (req: AuthRequest, res: Response) => Promise<Response>;
  GetSectorsAssigned: (req: AuthRequest, res: Response) => Promise<Response>;
  CreateSector: (req: AuthRequest, res: Response) => Promise<Response>;
  AssignSector: (req: AuthRequest, res: Response) => Promise<Response>;
  UnAssignSector: (req: AuthRequest, res: Response) => Promise<Response>;
  UpdateSector: (req: AuthRequest, res: Response) => Promise<Response>;
}

export interface LocationControllersUI {
  GetLocations?: (req: AuthRequest, res: Response) => Promise<Response>;
  GetLocation: (req: AuthRequest, res: Response) => Promise<Response>;
  GetByClient?: (req: AuthRequest, res: Response) => Promise<Response>;
  CreateLocation: (req: AuthRequest, res: Response) => Promise<Response>;
  UpdateLocation: (req: AuthRequest, res: Response) => Promise<Response>;
}

export interface CensusControllersUI {
  GetCensus: (req: AuthRequest, res: Response) => Promise<Response>;
  MyReport: (req: AuthRequest, res: Response) => Promise<Response>;
  MakeCensus: (req: AuthRequest, res: Response) => Promise<Response>;
  UpdateCensus: (req: AuthRequest, res: Response) => Promise<Response>;
  GetOneCensus: (req: AuthRequest, res: Response) => Promise<Response>;
  Report: (req: AuthRequest, res: Response) => Promise<Response>;
}
