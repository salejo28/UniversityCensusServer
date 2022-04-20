const ValidateString = (value: string | number | boolean): boolean => {
  if (typeof value !== "string") {
    return false;
  }

  const int = parseInt(value);

  if (!isNaN(int)) {
    return false;
  }

  return true;
};

export default ValidateString;
