import { Connect, Query } from "config";

import { GetOneOrDeleteOne, SpecieModelUI, SpeciePayload, Update } from "types";

import { GetQueryColumns, InsertData, UpdateQuery } from "lib";

export default class SpecieModel implements SpecieModelUI {
  public async getAll() {
    const connection = await Connect();
    const result = await Query(connection, "SELECT * FROM specie");
    connection.end();
    return result;
  }

  public async getOne(params: GetOneOrDeleteOne) {
    const connection = await Connect();
    const query = GetQueryColumns("specie", "SELECT", params);
    const result = await Query(connection, query, Object.values(params));
    connection.end();
    return result[0];
  }

  public async getById(id: number | string) {
    const connection = await Connect();
    const result = await Query(
      connection,
      "SELECT * FROM specie WHERE id = ?",
      id
    );
    connection.end();
    return result[0];
  }

  public async create(data: SpeciePayload) {
    const connection = await Connect();
    const query = InsertData("specie");
    const result = await Query(connection, query, data);
    connection.end();
    return result.insertId;
  }

  public async SearchSpecie(keyword: string) {
    const connection = await Connect();
    const result = await Query(
      connection,
      `SELECT * FROM specie WHERE name LIKE '${keyword}%'`
    );
    connection.end();
    return result;
  }

  public async serachIfExistForUpdate(
    idToSearch: number | string,
    params: Update
  ) {
    const connection = await Connect();
    const query = GetQueryColumns("specie", "SELECT", params);
    const result = await Query(
      connection,
      query.concat(` AND id <>${idToSearch}`),
      Object.values(params)
    );
    connection.end();
    return result;
  }

  public async updateById(id: string | number, newData: Update) {
    const connection = await Connect();
    const query = UpdateQuery("specie", { id }, newData);
    const result = await Query(
      connection,
      query,
      Object.values({
        ...newData,
        id,
      })
    );
    connection.end();
    return result;
  }

  public async deleteById(id: string | number) {
    const connection = await Connect();
    await Query(connection, "DELETE FROM specie WHERE id = ?", id);
    connection.end();
  }
}
