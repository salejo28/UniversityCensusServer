import {
  LoginPayload,
  ErrorUI,
  ValidationResponse,
  RegisterPayload,
} from "types";

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

  return {
    errors,
    valid: errors.path.length === 0,
  };
};
