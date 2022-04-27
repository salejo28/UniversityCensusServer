export const ValidFormatDate = (date: string) => {
  const regex = /^\d{2,4}\/\d{1,2}\/\d{1,2}$/;
  if (date.match(regex) && date !== "") {
    return true;
  }

  return false;
};
