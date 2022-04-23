import {
  LoginPayload,
  ErrorUI,
  ValidationResponse,
  RegisterPayload,
  SpeciePayload,
  RacePayload,
  AnimalPayload,
  SectorPayload,
  LocationPayload,
  CensusPayload,
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
    valid: errors.path.length === 0,
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
      !data.surname.trim() &&
      !data.password.trim() &&
      !data.idNumber.trim() &&
      !data.idType.trim()) ||
    !data
  ) {
    errors.path = [
      "firstName",
      "surname",
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

  if (!data.surname || !data.surname.trim()) {
    errors.path = ["surname"];
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

export const ValidateFormNewUser = (
  data: RegisterPayload,
  role: number
): ValidationResponse => {
  const { errors, valid } = ValidateFormRegister(data);

  if (!role || role === 0) {
    return {
      valid: false,
      errors: {
        path: ["role"],
        message: messageEmptyField,
      },
    };
  }

  return {
    errors,
    valid,
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

export const ValidateFormSector = (data: SectorPayload): ValidationResponse => {
  const errors: ErrorUI = {
    path: [],
    message: "",
  };

  const hasName = Object.prototype.hasOwnProperty.call(data, "name");
  const hasIsNeighborhood = Object.prototype.hasOwnProperty.call(
    data,
    "isNeighborhood"
  );
  const hasIsSidewalk = Object.prototype.hasOwnProperty.call(
    data,
    "isSidewalk"
  );
  const hasStart = Object.prototype.hasOwnProperty.call(data, "start");
  const hasEnd = Object.prototype.hasOwnProperty.call(data, "end");

  if (
    !data ||
    (!data.name.trim() &&
      !hasIsNeighborhood &&
      !hasIsSidewalk === undefined &&
      !hasStart === undefined &&
      !hasEnd === undefined)
  ) {
    errors.path = ["name", "isNeighborhood", "isSidewalk", "start", "end"];
    errors.message = messageEmptyField;
  }

  if (!hasName || !data.name.trim()) {
    errors.path = ["name"];
    errors.message = messageEmptyField;
  }

  if (!hasIsNeighborhood) {
    errors.path = ["isNeighborhood"];
    errors.message = messageEmptyField;
  }

  if (!hasStart) {
    errors.path = ["start"];
    errors.message = messageEmptyField;
  }

  if (!hasEnd) {
    errors.path = ["end"];
    errors.message = messageEmptyField;
  }

  const hasLatStart = Object.prototype.hasOwnProperty.call(data.start, "lat");
  const hasLngStart = Object.prototype.hasOwnProperty.call(data.start, "lng");
  if (!hasLatStart && !hasLngStart) {
    errors.path = ["latStart", "lngStart"];
    errors.message = "Latitude and Longitude start are required";
  }

  if (!hasLatStart) {
    errors.path = ["latStart"];
    errors.message = "Latitude start is required";
  }

  if (!hasLatStart) {
    errors.path = ["latStart"];
    errors.message = "Longitude start is required";
  }

  const hasLatEnd = Object.prototype.hasOwnProperty.call(data.end, "lat");
  const hasLngEnd = Object.prototype.hasOwnProperty.call(data.end, "lng");
  if (!hasLatEnd && !hasLngEnd) {
    errors.path = ["latEnd", "lngEnd"];
    errors.message = "Latituda and Longitude end are required";
  }

  if (!hasLatEnd) {
    errors.path = ["latEnd"];
    errors.message = "Latitude end is required";
  }

  if (!hasLngEnd) {
    errors.path = ["lngEnd"];
    errors.message = "Longitude end is required";
  }

  return {
    errors,
    valid: errors.path.length === 0,
  };
};

export const ValidateFormLocation = (
  data: LocationPayload
): ValidationResponse => {
  const errors: ErrorUI = {
    path: [],
    message: "",
  };

  if (
    !data ||
    (!data.geo &&
      (!data.address || !data.address.trim()) &&
      (!data.sector || data.sector === 0))
  ) {
    errors.path = ["geo", "address", "sector"];
    errors.message = messageEmptyField;
  }

  if (!data.address || !data.address.trim()) {
    errors.path = ["address"];
    errors.message = messageEmptyField;
  }

  if (!data.sector || data.sector === 0) {
    errors.path = ["sector"];
    errors.message = messageEmptyField;
  }

  if (!data.geo) {
    errors.path = ["geo"];
    errors.message = messageEmptyField;
  }

  const hasLat = Object.prototype.hasOwnProperty.call(data.geo, "lat");
  const hasLng = Object.prototype.hasOwnProperty.call(data.geo, "lng");

  if (!hasLat && !hasLng) {
    errors.path = ["geoLat", "geoLng"];
    errors.message = messageEmptyField;
  }

  if (!hasLat) {
    errors.path = ["geoLat"];
    errors.message = messageEmptyField;
  }

  if (!hasLng) {
    errors.path = ["geoLng"];
    errors.message = messageEmptyField;
  }

  return {
    valid: errors.path.length === 0,
    errors,
  };
};

export const ValidateFormCensus = (data: CensusPayload): ValidationResponse => {
  const errors: ErrorUI = {
    path: [],
    message: "",
  };

  if (
    !data ||
    ((!data.pet || data.pet === 0) &&
      (!data.owner || data.owner === 0) &&
      (!data.location || data.location === 0))
  ) {
    errors.path = ["pet", "owner", "location"];
    errors.message = messageEmptyField;
  }

  if (!data.pet || data.pet === 0) {
    errors.path = ["pet"];
    errors.message = messageEmptyField;
  }

  if (!data.owner || data.owner === 0) {
    errors.path = ["owner"];
    errors.message = messageEmptyField;
  }

  if (!data.location || data.location === 0) {
    errors.path = ["location"];
    errors.message = messageEmptyField;
  }

  return {
    valid: errors.path.length === 0,
    errors,
  };
};
