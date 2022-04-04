import { Connect, Query } from "config";

import { TypeIdModelUI, One } from "types";

export default class TypeIdModel implements TypeIdModelUI {
  public async getAll() {
    const connection = await Connect();
    const result = await Query(connection, "SELECT * FROM ct_tipos_documentos");
    connection.end();
    return result;
  }

  public async getOne(params: One) {
    const connection = await Connect();
    const key = Object.keys(params)[0];
    console.log(params[key]);
    /* const result = await Query(
      connection,
      `SELECT * FROM ct_tipos_documentos WHERE ${key} = ${params[key]}`
    ); */
    connection.end();
    /* console.log(result); */
  }
}
