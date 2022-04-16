import { Connect, Query } from "config";
import { UserRolesModelUI } from "types";
import { InsertData } from "lib";

export default class UserRolesModel implements UserRolesModelUI {
  public async asociate(uid: number, roleId: number): Promise<void> {
    const connection = await Connect();
    const query = InsertData("users_roles");
    await Query(connection, query, {
      user_id: uid,
      role_id: roleId,
    });
    connection.end();
  }
}
