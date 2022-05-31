import { Connect, Query } from "config";

import { GetQueryColumns, InsertData, UpdateQuery } from "lib";
import { GetOneOrDeleteOne, RacePayload, Update, RaceModelUI } from "types";

export default class RaceModel implements RaceModelUI {
  public async getAll() {
    const connection = await Connect();
    const result = await Query(
      connection,
      "SELECT race.name, race.id, race.dangerous, race.createdAt, specie.name AS specie FROM race INNER JOIN specie ON race.specie = specie.id"
    );
    connection.end();
    return result;
  }

  public async getById(id: number | string) {
    const connection = await Connect();
    const result = await Query(
      connection,
      "SELECT race.name, race.id, race.dangerous, race.createdAt, specie.name AS specie FROM race INNER JOIN specie ON race.specie = specie.id WHERE race.id = ?",
      id
    );
    connection.end();
    return result[0];
  }

  public async getOne(params: GetOneOrDeleteOne) {
    const connection = await Connect();
    const query = GetQueryColumns("race", "SELECT", params);
    const result = await Query(connection, query, Object.values(params));
    connection.end();
    return result[0];
  }

  public async create(data: RacePayload) {
    const connection = await Connect();
    const query = InsertData("race");
    const result = await Query(connection, query, data);
    connection.end();
    return result.insertId;
  }

  public async SearchRace(keyword: string) {
    const connection = await Connect();
    const result = await Query(
      connection,
      `SELECT * FROM race WHERE name LIKE '${keyword}%'`
    );
    connection.end();
    return result;
  }

  public async serachIfExistForUpdate(
    idToSearch: number | string,
    params: Update
  ) {
    const connection = await Connect();
    const query = GetQueryColumns("race", "SELECT", params);
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
    const query = UpdateQuery("race", { id }, newData);
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
    await Query(connection, "DELETE FROM race WHERE id = ?", id);
    connection.end();
  }
}
