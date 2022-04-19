import { GetQueryColumns, InsertData, UpdateQuery } from "lib";
import { Connect, Query } from "config";
import { CensusModelUI, CensusPayload, Update } from "types";

export default class CensusModel implements CensusModelUI {
  public async getAll() {
    /* SELECT census.description, census.createdAt, census.updatedAt, owner, official, location, pet FROM census LEFT JOIN user AS ow ON census.owner = ow.id GROUP BY owner LEFT JOIN user AS of ON census.official = of.id GROUP BY official LEFT JOIN location ON location.id = census.location GROUP BY location LEFT JOIN animal ON animal.id = census.pet GROUP BY pet */
    const connection = await Connect();
    const result = await Query(
      connection,
      "SELECT census.description, census.createdAt, census.description, census.updatedAt, census.date_census, CONCAT_WS(' ', owner.firstName, owner.middleName, owner.surname, owner.lastName) AS ownerName, owner.id AS ownerId, owner.email AS ownerEmail, CONCAT_WS(' ', official.firstName, official.middleName, official.surname, official.lastName) AS officialName, official.id AS officialId, animal.name AS animalName, animal.id AS animalId FROM census INNER JOIN user AS owner ON owner.id = census.owner INNER JOIN user AS official ON official.id = census.official INNER JOIN animal ON census.pet = animal.id"
    );
    connection.end();
    return result;
  }

  async create(data: CensusPayload) {
    const connection = await Connect();
    const query = InsertData("census");
    const result = await Query(connection, query, data);
    connection.end();
    return result.insertId;
  }

  public async serachIfExistForUpdate(
    idToSearch: number | string,
    params: Update
  ) {
    const connection = await Connect();
    const query = GetQueryColumns("census", "SELECT", params);
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
    const query = UpdateQuery("census", { id }, newData);
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

  public async getReportByOfficial(idOfficial: number | string) {
    const connection = await Connect();
    const result = await Query(
      connection,
      "SELECT census.description, census.createdAt, census.updatedAt, owner, official, location, pet FROM census INNER JOIN user AS owner ON census.owner = owner.id GROUP BY owner INNER JOIN user AS official ON census.official = official.id GROUP BY official INNER JOIN location ON location.id = census.location GROUP BY location INNER JOIN animal ON animal.id = census.pet GROUP BY pet WHERE census.official = ?",
      idOfficial
    );
    connection.end();
    return result;
  }
}
