import { Connect, Query } from "config";

import { GetQueryColumns } from "lib";
import { TypeIdModelUI, GetOneOrDeleteOne } from "types";

export default class TypeIdModel implements TypeIdModelUI {
  public async getAll() {
    const connection = await Connect();
    const result = await Query(connection, "SELECT * FROM idtypes");
    connection.end();
    return result;
  }

  public async getOne(params: GetOneOrDeleteOne) {
    const connection = await Connect();
    const query = GetQueryColumns("idtypes", "SELECT", params);
    const result = await Query(connection, query, Object.values(params));
    connection.end();
    return result[0];
  }

  public async getById(id: number | string) {
    const connection = await Connect();
    const result = await Query(
      connection,
      "SELECT * FROM idtypes WHERE id = ?",
      id
    );
    connection.end();
    return result[0];
  }
}
