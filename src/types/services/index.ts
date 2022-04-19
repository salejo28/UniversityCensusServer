import { Geolocation } from "types";
import { Update, User } from "../models";

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  middleName: string;
  surname: string;
  email: string;
  idType: string;
  idNumber: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ErrorServiceResponse {
  success: boolean;
  path: string;
}

export interface SuccessServiceResponse {
  success: boolean;
  id: number;
}

export interface SpeciePayload {
  isPet: boolean | number;
  name: string;
}

export interface RacePayload {
  name: string;
  dangerous: boolean | number;
  specie: number | string;
}

export interface AnimalPayload {
  name: string;
  bornDate: string;
  owner: number | string;
  race: number | string;
}

export interface SectorPayload {
  name: string;
  isNeighborhood: boolean | number;
  isSidewalk: boolean | number;
  start: Geolocation;
  end: Geolocation;
  official: string | number | null;
}

export interface LocationPayload {
  geo: Geolocation;
  sector: number | string;
  address: string;
}

export interface CensusPayload {
  pet: string | number;
  owner: string | number;
  location: string | number;
  description: string;
}

export interface ErrorUI {
  path: string[];
  message: string;
}

export interface ValidationResponse {
  errors: ErrorUI;
  valid: boolean;
}

export interface AuthServiceUI {
  Register?: (
    payload: RegisterPayload
  ) => Promise<SuccessServiceResponse | ErrorServiceResponse>;
  Login?: (payload: LoginPayload) => Promise<boolean | number>;
}

export interface UserServiceUI {
  CreateUser: (
    payload: RegisterPayload,
    role?: number
  ) => Promise<SuccessServiceResponse | ErrorServiceResponse>;
  GetUserByEmail: (email: string) => Promise<User>;
  UpdateUser: (
    payload: Update,
    id: string | number
  ) => Promise<SuccessServiceResponse | ErrorServiceResponse>;
}
