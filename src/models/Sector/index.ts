import { Connect, Query } from "config";

import { GetQueryColumns, InsertData, UpdateQuery } from "lib";
import {
  GetOneOrDeleteOne,
  SectorPayload,
  Update,
  SectorModelUI,
  Geolocation,
} from "types";

export default class SectorModel implements SectorModelUI {
  public async getAll() {
    const connection = await Connect();
    const result = await Query(connection, "SELECT * FROM sector");
    connection.end();
    return result;
  }

  public async getAssignedSectors() {
    const connection = await Connect();
    const result = await Query(
      connection,
      "SELECT sector.*, user.firstName, user.middleName, user.surname, user.lastName FROM sector INNER JOIN user ON user.id = sector.official"
    );
    connection.end();
    return result;
  }

  public async getOne(params: GetOneOrDeleteOne) {
    const connection = await Connect();
    const query = GetQueryColumns("sector", "SELECT", params);
    const result = await Query(connection, query, Object.values(params));
    connection.end();
    return result[0];
  }

  public async getById(id: number | string) {
    const connection = await Connect();
    const result = await Query(
      connection,
      "SELECT sector.*, user.firstName, user.middleName, user.surname, user.lastName FROM sector INNER JOIN user ON user.id = sector.official WHERE sector.id = ?",
      id
    );
    connection.end();
    return result[0];
  }

  public async verifyGeolocation(start: Geolocation, end: Geolocation) {
    const connection = await Connect();
    const result = await Query(
      connection,
      `SELECT * FROM sector WHERE JSON_EXTRACT(start, '$.lat') = ${start.lat} AND JSON_EXTRACT(start, '$.lng') = ${start.lng} AND JSON_EXTRACT(end, '$.lat') = ${end.lat} AND JSON_EXTRACT(end, '$.lng') = ${end.lng}`
    );
    connection.end();
    return result[0];
  }

  public async create(data: SectorPayload) {
    const connection = await Connect();
    const query = InsertData("sector");
    const result = await Query(connection, query, data);
    connection.end();
    return result.insertId;
  }

  public async updateById(id: string | number, newData: Update) {
    const connection = await Connect();
    const query = UpdateQuery("sector", { id }, newData);
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

  public async assignSectorToOfficial(
    idOfficial: string | number,
    idSector: string | number
  ) {
    const connetion = await Connect();
    const query = `UPDATE sector SET official = ${idOfficial} WHERE id = ${idSector}`;
    await Query(connetion, query);
  }

  public async unassignSectorOfOfficial(idSector: string | number) {
    const connetion = await Connect();
    const query = `UPDATE sector SET official = ${null} WHERE id = ${idSector}`;
    await Query(connetion, query);
  }

  public async serachIfExistForUpdate(
    idToSearch: number | string,
    params: Update
  ) {
    const connection = await Connect();
    const query = GetQueryColumns("sector", "SELECT", params);
    const result = await Query(
      connection,
      query.concat(` AND id <>${idToSearch}`),
      Object.values(params)
    );
    connection.end();
    return result;
  }

  public async verifySectorWithAssignation(idSector: string | number) {
    const connection = await Connect();
    const result = await Query(
      connection,
      `SELECT * FROM sector WHERE id = ${idSector} AND official <> ${null}`
    );
    connection.end();
    return result[0];
  }

  public async checkOfficialWithSector(idOfficial: string | number) {
    const connection = await Connect();
    const result = await Query(
      connection,
      "SELECT * FROM sector WHERE official = ?",
      {
        official: idOfficial,
      }
    );
    connection.end();
    return result[0];
  }
}
