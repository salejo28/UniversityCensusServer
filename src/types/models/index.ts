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

interface UserRole {
  user_id: number;
  role_id: number;
}

export interface Update {
  [key: string]: string | number | boolean;
}

export interface GetOneOrDeleteOne {
  [key: string]: string | number;
}
// Gloabls Interfaces
export interface TypeIdModelUI extends ModelUI<TypeIdUI> {}
export interface UserModelUI extends ModelUI<User> {}
export interface UserRolesModelUI extends ModelUI<UserRole> {
  asociate: (uid: number, roleId: number) => Promise<void>;
}
export interface SpecieModelUI extends ModelUI<Specie> {
  readonly SearchSpecie: (keyword: string) => Promise<Specie[]>;
}
export interface RaceModelUI extends ModelUI<Race> {
  readonly SearchRace: (keyword: string) => Promise<Specie[]>;
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
