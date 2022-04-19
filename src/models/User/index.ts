import { Connect, Query } from "config";

import {
  GetOneOrDeleteOne,
  UserModelUI,
  RegisterPayload,
  User,
  Update,
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
}
