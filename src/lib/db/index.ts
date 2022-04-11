import { GetOneOrDeleteOne } from "app/types";

export const GetQueryColumns = (
  table: string,
  type: "SELECT" | "DELETE",
  params?: GetOneOrDeleteOne | null | undefined
): string => {
  if (params) {
    const query = `${type} ${type === "SELECT" ? "*" : ""} FROM ${table} ${
      params && "WHERE"
    }`;
    let columns = "";
    const keys = Object.keys(params);
    if (keys.length > 1) {
      columns = keys.join(" = ?, ");
    } else {
      columns = `${keys[0]} = ?`;
    }

    return [query, columns].join(" ");
  }
  const query = `${type} ${type === "SELECT" ? "*" : ""} FROM ${table}`;
  return query;
};
