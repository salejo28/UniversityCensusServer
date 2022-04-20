import {
  LoginPayload,
  ErrorUI,
  ValidationResponse,
  RegisterPayload,
  SpeciePayload,
  RacePayload,
  AnimalPayload,
} from "types";
import ValidateString from "./validateString";

const messageEmptyField = "This field is required";

const CheckEmail = (email: string): boolean => {
  const validEmail =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  if (!validEmail) {
    return false;
  }
  return true;
};

export const ValidateFormLogin = (data: LoginPayload): ValidationResponse => {
  const errors: ErrorUI = {
    path: [],
    message: "",
  };
  if ((!data.email.trim() && !data.password.trim()) || !data) {
    errors.path = ["email", "password"];
    errors.message = messageEmptyField;
  }

  if (!data.email.trim()) {
    errors.path = ["email"];
    errors.message = messageEmptyField;
  } else if (!CheckEmail(data.email)) {
    errors.path = ["email"];
    errors.message = "Invalid email";
  }

  if (!data.password.trim()) {
    errors.path = ["password"];
    errors.message = messageEmptyField;
  }

  return {
    errors,
    valid: errors.path.length === 1,
  };
};

export const ValidateFormRegister = (
  data: RegisterPayload
): ValidationResponse => {
  const errors: ErrorUI = {
    path: [],
    message: "",
  };

  if (
    (!data.email.trim() &&
      !data.firstName.trim() &&
      !data.middleName.trim() &&
      !data.surname.trim() &&
      !data.lastName.trim() &&
      !data.password.trim() &&
      !data.idNumber.trim() &&
      !data.idType.trim()) ||
    !data
  ) {
    errors.path = [
      "firstName",
      "middleName",
      "surname",
      "lastName",
      "email",
      "idNumber",
      "idType",
      "password",
    ];
    errors.message = messageEmptyField;
  }

  if (!data.firstName || !data.firstName.trim()) {
    errors.path = ["firstName"];
    errors.message = messageEmptyField;
  }

  if (!data.middleName || !data.middleName.trim()) {
    errors.path = ["middleName"];
    errors.message = messageEmptyField;
  }

  if (!data.surname || !data.surname.trim()) {
    errors.path = ["surname"];
    errors.message = messageEmptyField;
  }

  if (!data.lastName || !data.lastName.trim()) {
    errors.path = ["lastName"];
    errors.message = messageEmptyField;
  }

  if (!data.email || !data.email.trim()) {
    errors.path = ["email"];
    errors.message = messageEmptyField;
  } else if (!CheckEmail(data.email)) {
    errors.path = ["email"];
    errors.message = "Invalid email";
  }

  if (!data.idNumber || !data.idNumber.trim()) {
    errors.path = ["idNumber"];
    errors.message = messageEmptyField;
  }

  if (!data.idType || !data.idType.trim()) {
    errors.path = ["idType"];
    errors.message = messageEmptyField;
  }

  if (!data.password || !data.password.trim()) {
    errors.path = ["password"];
    errors.message = messageEmptyField;
  }

  const values = Object.values({
    firstName: data.firstName,
    middleName: data.middleName,
    surname: data.surname,
    lastName: data.lastName,
    idType: data.idType,
  });
  const keys = Object.keys({
    firstName: data.firstName,
    middleName: data.middleName,
    surname: data.surname,
    lastName: data.lastName,
    idType: data.idType,
  });

  const validationString = keys.map((key, i) => {
    if (!ValidateString(values[i])) {
      return {
        valid: false,
        key,
      };
    }

    return {
      valid: true,
    };
  });

  if (!validationString.every((validation) => validation.valid)) {
    errors.path = validationString
      .map((validation) => {
        if (!validation.valid) {
          return validation.key as string;
        }

        return "";
      })
      .filter((key) => key.trim());
    errors.message = "Field must be a string";
  }

  return {
    errors,
    valid: errors.path.length === 0,
  };
};

export const ValidateFormScpecie = (
  data: SpeciePayload
): ValidationResponse => {
  const errors: ErrorUI = {
    path: [],
    message: "",
  };

  if ((!data.name.trim() && data.isPet === undefined) || !data) {
    errors.path = ["isPet", "name"];
    errors.message = messageEmptyField;
  }

  if (!data.name.trim()) {
    errors.path = ["name"];
    errors.message = messageEmptyField;
  }

  if (data.isPet === undefined) {
    errors.path = ["isPet"];
    errors.message = messageEmptyField;
  }

  if (!ValidateString(data.name)) {
    errors.path = ["name"];
    errors.message = "Name must be a string";
  }

  return {
    valid: errors.path.length === 0,
    errors,
  };
};

export const ValidateFormRace = (data: RacePayload): ValidationResponse => {
  const errors: ErrorUI = {
    path: [],
    message: "",
  };

  if (
    !data ||
    (!data.name.trim() &&
      data.dangerous === undefined &&
      (data.specie === 0 || data.specie.toString().trim()))
  ) {
    errors.path = ["name", "dangerous", "specie"];
    errors.message = messageEmptyField;
  }

  if (!data.name.trim()) {
    errors.path = ["name"];
    errors.message = messageEmptyField;
  }

  if (!ValidateString(data.name)) {
    errors.path = ["name"];
    errors.message = "Name must be a string";
  }

  if (data.dangerous === undefined) {
    errors.path = ["dangerous"];
    errors.message = messageEmptyField;
  }

  if (!data.specie || !data.specie.toString().trim() || data.specie === 0) {
    errors.path = ["specie"];
    errors.message = messageEmptyField;
  }

  return {
    valid: errors.path.length === 0,
    errors,
  };
};

export const ValidateFormAnimal = (data: AnimalPayload): ValidationResponse => {
  const errors: ErrorUI = {
    path: [],
    message: "",
  };

  if (
    !data ||
    (!data.name.trim() &&
      !data.bornDate.trim() &&
      (data.owner === 0 || !data.owner.toString().trim()) &&
      (data.race === 0 || !data.race.toString().trim()))
  ) {
    errors.path = ["name", "bornDate", "owner", "race"];
    errors.message = messageEmptyField;
  }

  if (!data.name.trim()) {
    errors.path = ["name"];
    errors.message = messageEmptyField;
  }

  if (!ValidateString(data.name)) {
    errors.path = ["name"];
    errors.message = "Name must be a string";
  }

  if (!data.bornDate.trim()) {
    errors.path = ["bornDate"];
    errors.message = messageEmptyField;
  }

  if (!ValidateString(data.bornDate)) {
    errors.path = ["bornDate"];
    errors.message = "Born date must be a date";
  }

  if (!data.owner || !data.owner.toString().trim() || data.owner === 0) {
    errors.path = ["owner"];
    errors.message = messageEmptyField;
  }

  return {
    errors,
    valid: errors.path.length === 0,
  };
};
