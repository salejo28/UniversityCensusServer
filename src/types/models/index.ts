import { OfficialAdditionalInfoPayload } from "types";

interface TypeIdUI {
  id?: number;
  abbreviation: string;
  value: string;
}

export interface User {
  id?: number;
  firstName: string;
  middleName: string;
  surname: string;
  lastName: string;
  email: string;
  idType: string;
  idNumber: string;
  cellphone?: string;
  imgUri?: string;
  bornDate?: string;
  password: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  role?: string;
}

export interface Specie {
  id?: number;
  name: string;
  isPet: number | boolean;
  createdAt?: string;
}

export interface Race {
  id?: number;
  name: string;
  dangerous: number | boolean;
  specie: string | number;
  createdAt?: string;
}

export interface Animal {
  id?: number;
  name: string;
  bornDate: string;
  owner: string | number;
  race: string | number;
  createdAt?: string;
  updatedAt: string;
}

export interface Geolocation {
  lat: number;
  lng: number;
}

export interface Sector {
  id?: number;
  name: string;
  isNeighborhood: boolean | number;
  isSidewalk: boolean | number;
  start: Geolocation;
  end: Geolocation;
  official: string | number | null;
  createdAt?: string;
}

export interface Location {
  id?: number;
  address: string;
  geo: Geolocation;
  sector: number | string;
  user: number | string;
  createdAt?: string;
  updatedAt: string;
}

export interface Census {
  id?: number;
  pet: string | number;
  owner: string | number;
  official: string | number;
  location: string | number;
  description: string;
  date_census: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserRole {
  id?: number | string;
  user_id: number;
  role_id: number;
}

export interface Update {
  [key: string]: string | number | boolean | Date;
}

export interface GetOneOrDeleteOne {
  [key: string]: string | number;
}
// Gloabls Interfaces
export interface TypeIdModelUI extends ModelUI<TypeIdUI> {}
export interface UserModelUI extends ModelUI<User> {
  getOfficials?: () => Promise<User[]>;
  addInfoAdditionalOfficial?: (
    payload: OfficialAdditionalInfoPayload
  ) => Promise<void>;
  updateAdditionalInfo?: (data: Update, id: number | string) => Promise<void>;
}
export interface UserRolesModelUI extends ModelUI<UserRole> {
  asociate: (uid: number, roleId: number) => Promise<void>;
}
export interface SpecieModelUI extends ModelUI<Specie> {
  readonly SearchSpecie: (keyword: string) => Promise<Specie[]>;
}
export interface RaceModelUI extends ModelUI<Race> {
  readonly SearchRace: (keyword: string) => Promise<Specie[]>;
}

export interface AnimalModelUI extends ModelUI<Animal> {
  getByOwner: (owner: string | number) => Promise<Animal[]>;
}

export interface SectorModelUI extends ModelUI<Sector> {
  assignSectorToOfficial: (
    idOfficial: string | number,
    idSector: string | number
  ) => Promise<void>;
  unassignSectorOfOfficial: (idSector: string | number) => Promise<void>;
  verifySectorWithAssignation: (idSector: string | number) => Promise<Sector>;
  checkOfficialWithSector: (idOfficial: string | number) => Promise<Sector>;
  verifyGeolocation: (start: Geolocation, end: Geolocation) => Promise<Sector>;
  getAssignedSectors: () => Promise<Sector>;
}

export interface LocationModelUI extends ModelUI<Location> {
  verifyGeolocation: (geo: Geolocation) => Promise<Location>;
}

export interface CensusModelUI extends ModelUI<Census> {
  getReportByOfficial: (idOfficia: number | string) => Promise<Census[]>;
}

export interface ModelUI<T> {
  readonly getAll?: () => Promise<T[]>;
  readonly getOne?: (params: GetOneOrDeleteOne) => Promise<T | null>;
  readonly getById?: (id: number | string) => Promise<T | null>;
  readonly create?: (data: T) => Promise<T | number>;
  readonly deleteOne?: (data: GetOneOrDeleteOne) => Promise<T | void>;
  readonly deleteById?: (id: number | string) => Promise<T | void>;
  readonly updateOne?: (params: Update, newData: Update) => Promise<T>;
  readonly updateById?: (id: number | string, newData: Update) => Promise<T>;
  readonly serachIfExistForUpdate?: (
    idToSearch: number | string,
    params: Update
  ) => Promise<T | null | undefined>;
}
