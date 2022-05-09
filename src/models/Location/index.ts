import { Connect, Query } from "config";
import {
  Geolocation,
  GetOneOrDeleteOne,
  LocationModelUI,
  LocationPayload,
  Update,
} from "types";
import { GetQueryColumns, InsertData, UpdateQuery } from "lib";

export default class LocationModel implements LocationModelUI {
  public async verifyGeolocation(geo: Geolocation) {
    const connection = await Connect();
    const result = await Query(
      connection,
      `SELECT * FROM location WHERE JSON_EXTRACT(geo, '$.lat') = ${geo.lat} AND JSON_EXTRACT(geo, '$.lng') = ${geo.lng}`
    );
    connection.end();
    return result[0];
  }

  public async getOne(params: GetOneOrDeleteOne) {
    const connection = await Connect();
    const query =
      "SELECT location.id, location.address, location.geo, location.createdAt, location.updatedAt, CONCAT_WS(' ', user.firstName, user.middleName, user.surname, user.lastName) as user, user.id as userId, sector.name as sector, sector.id as sectorId FROM location INNER JOIN user ON user.id = location.user INNER JOIN sector ON sector.id = location.sector WHERE location.user = ?";
    const result = await Query(connection, query, Object.values(params));
    connection.end();
    return result[0];
  }

  public async create(data: LocationPayload) {
    const connection = await Connect();
    const query = InsertData("location");
    const result = await Query(connection, query, data);
    connection.end();
    return result.insertId;
  }

  public async serachIfExistForUpdate(
    idToSearch: number | string,
    params: Update
  ) {
    const connection = await Connect();
    const query = GetQueryColumns("location", "SELECT", params);
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
    const query = UpdateQuery("location", { id }, newData);
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
