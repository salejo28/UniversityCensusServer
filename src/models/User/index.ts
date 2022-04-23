import { Connect, Query } from "config";

import {
  GetOneOrDeleteOne,
  UserModelUI,
  RegisterPayload,
  User,
  Update,
  UserRole,
  OfficialAdditionalInfoPayload,
} from "types";
import { GetQueryColumns, InsertData, UpdateQuery } from "lib";

export default class UserModel implements UserModelUI {
  public async getAll() {
    const connection = await Connect();
    const result = await Query(connection, "SELECT * FROM user");
    connection.end();
    return result;
  }

  public async getOne(params: GetOneOrDeleteOne): Promise<User | null> {
    const connection = await Connect();
    const query = GetQueryColumns("user", "SELECT", params);
    const result = await Query(connection, query, Object.values(params));
    connection.end();
    return result[0];
  }

  public async getById(id: number | string): Promise<User | null> {
    const connection = await Connect();
    const result = await Query(
      connection,
      "SELECT user.id, user.firstName, user.middleName, user.surname, user.lastName, user.email, user.idType, user.idNumber, user.cellphone, user.imgUri, user.bornDate, user.active, user.createdAt, roles.name AS role FROM user INNER JOIN users_roles ON user.id = users_roles.user_id INNER JOIN roles ON roles.id = users_roles.role_id WHERE user.id = ?",
      id
    );
    connection.end();
    return result[0];
  }

  public async create(data: RegisterPayload) {
    const connection = await Connect();
    const query = InsertData("user");
    const result = await Query(connection, query, data);
    connection.end();
    return result.insertId;
  }

  public async updateById(id: number | string, newData: Update) {
    const connection = await Connect();
    const query = UpdateQuery("user", { id }, newData);
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

  public async serachIfExistForUpdate(
    idToSearch: number | string,
    params: Update
  ) {
    const connection = await Connect();
    const query = GetQueryColumns("user", "SELECT", params);
    const result = await Query(
      connection,
      query.concat(` AND id <>${idToSearch}`),
      Object.values(params)
    );
    connection.end();
    return result;
  }

  public async getOfficials() {
    const connection = await Connect();
    const users_roles = await Query(
      connection,
      `SELECT * FROM users_roles WHERE role_id = ${3}`
    );
    const users = await Promise.all(
      users_roles.map(async (user_role: UserRole) => {
        const result = await Query(
          connection,
          "SELECT user.id, user.firstName, user.middleName, user.surname, user.lastName, user.email, user.idType, user.idNumber, user.cellphone, user.imgUri, user.bornDate, user.active, user.createdAt, roles.name AS role, info.active AS active, CONCAT_WS(' ', boss.firstName, boss.middleName, boss.surname, boss.lastName) AS bossName, boss.id AS bossId, sector.name AS sectorName, sector.id AS sectorId FROM user INNER JOIN users_roles ON user.id = users_roles.user_id INNER JOIN roles ON roles.id = users_roles.role_id INNER JOIN aditional_info_official AS info ON info.official INNER JOIN user AS boss ON boss.id = info.boss INNER JOIN sector ON sector.id = info.sector = user.id WHERE user.id = ?",
          user_role.user_id
        );
        return result[0];
      })
    );
    connection.end();
    return users;
  }

  public async addInfoAdditionalOfficial(
    payload: OfficialAdditionalInfoPayload
  ) {
    const connection = await Connect();
    const query = InsertData("aditional_info_official");
    await Query(connection, query, payload);
    connection.end();
  }

  public async updateAdditionalInfo(data: Update, id: number | string) {
    const connection = await Connect();
    const query = UpdateQuery("aditional_info_official", { id }, data);
    await Query(
      connection,
      query,
      Object.values({
        ...data,
        id,
      })
    );
    connection.end();
  }
}
