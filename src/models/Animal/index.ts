import { Connect, Query } from "config";

import { AnimalModelUI, GetOneOrDeleteOne, AnimalPayload, Update } from "types";
import { GetQueryColumns, InsertData, UpdateQuery } from "lib";

export default class AnimalModel implements AnimalModelUI {
  public async getAll() {
    const connection = await Connect();
    const result = await Query(connection, "SELECT * FROM animal");
    connection.end();
    return result;
  }

  public async getOne(params: GetOneOrDeleteOne) {
    const connection = await Connect();
    const query = GetQueryColumns("animal", "SELECT", params);
    const result = await Query(connection, query, Object.values(params));
    connection.end();
    return result[0];
  }

  public async getById(id: number | string) {
    const connection = await Connect();
    const result = await Query(
      connection,
      "SELECT animal.id, animal.name, animal.bornDate, animal.createdAt, animal.updatedAt, race.name AS race, user.firstName, user.middleName, user.surname, user.lastName FROM animal INNER JOIN user ON user.id = animal.owner INNER JOIN race ON race.id = animal.race WHERE animal.id = ?",
      id
    );
    connection.end();
    return result[0];
  }

  public async getByOwner(owner: string | number) {
    const connection = await Connect();
    const result = await Query(
      connection,
      "SELECT animal.id, animal.name, animal.bornDate, animal.createdAt, animal.updatedAt, race.name AS race, user.firstName, user.middleName, user.surname, user.lastName FROM animal INNER JOIN user ON user.id = animal.owner INNER JOIN race ON race.id = animal.race WHERE animal.owner = ?",
      owner
    );
    connection.end();
    return result;
  }

  public async create(data: AnimalPayload) {
    const connection = await Connect();
    const query = InsertData("animal");
    const result = await Query(connection, query, data);
    connection.end();
    return result.insertId;
  }

  public async serachIfExistForUpdate(
    idToSearch: number | string,
    params: Update
  ) {
    const connection = await Connect();
    const query = GetQueryColumns("animal", "SELECT", params);
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
    const query = UpdateQuery("animal", { id }, newData);
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
}
