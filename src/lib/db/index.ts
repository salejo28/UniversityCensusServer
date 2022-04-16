import { GetOneOrDeleteOne, Update } from "types";

export const GetQueryColumns = (
  table: string,
  type: "SELECT" | "DELETE",
  params?: GetOneOrDeleteOne | Update | null | undefined
): string => {
  if (params) {
    const query = `${type} ${type === "SELECT" ? "*" : ""} FROM ${table} ${
      params && "WHERE"
    }`;
    let columns = "";
    const keys = Object.keys(params);
    if (keys.length > 1) {
      columns = keys.join(" = ? AND ").concat(" = ?");
    } else {
      columns = `${keys[0]} = ?`;
    }
    return [query, columns].join(" ");
  }
  const query = `${type} ${type === "SELECT" ? "*" : ""} FROM ${table}`;
  return query;
};

export const InsertData = (table: string): string => {
  const query = `INSERT INTO ${table} SET ?`;
  return query;
};

export const UpdateQuery = (
  table: string,
  condition: Update,
  data: Update
): string => {
  const query = `UPDATE ${table} SET`;
  let columnsToUpdate = "";
  let conditionToUpdate = "";
  const keysColumns = Object.keys(data);
  const keysCondition = Object.keys(condition);
  if (keysColumns.length > 1) {
    columnsToUpdate = keysColumns.join(" = ?, ").concat(" = ?");
  } else {
    columnsToUpdate = `${keysColumns[0]} = ?`;
  }

  if (keysCondition.length > 1) {
    conditionToUpdate = keysCondition.join(" = ? AND ").concat(" = ?");
  } else {
    conditionToUpdate = `${keysCondition[0]} = ?`;
  }
  return [query, columnsToUpdate.concat(" WHERE "), conditionToUpdate].join(
    " "
  );
};
