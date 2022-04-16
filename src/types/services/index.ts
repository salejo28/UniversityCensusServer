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
}
