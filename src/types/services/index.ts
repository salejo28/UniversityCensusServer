export interface RegisterPayload {
  firstName: string;
  lastName: string;
  middleName: string;
  surname: string;
  email: string;
  idType: string;
  idNumber: string;
  cellPhone: string;
  imgUri: string;
  password: string;
  bornDate: string;
}

export interface AuthServiceUI {
  Register?: (payload: RegisterPayload) => Promise<string>;
}
