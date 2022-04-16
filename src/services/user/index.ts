import { RegisterPayload, UserServiceUI } from "types";
import { UserModel, UserRolesModel } from "models";
import { EncryptPassword } from "security";

export default class UserService implements UserServiceUI {
  private userModel: UserModel;
  private userRoleModel: UserRolesModel;

  constructor() {
    this.userModel = new UserModel();
    this.userRoleModel = new UserRolesModel();
  }

  public async CreateUser(payload: RegisterPayload, role?: number) {
    /* Verify if exist user with email */
    const existWithEmail = await this.userModel.getOne({
      email: payload.email,
    });
    if (existWithEmail) {
      return {
        success: false,
        path: "email",
      };
    }

    /* Verify if exist user with id number and id type */
    const existWithIdentity = await this.userModel.getOne({
      idType: payload.idType,
      idNumber: payload.idNumber,
    });
    if (existWithIdentity) {
      return {
        success: false,
        path: "identity",
      };
    }

    const hashedPassword = await EncryptPassword(payload.password);
    payload.password = hashedPassword;

    const uid = await this.userModel.create(payload);
    /* Asociate role with user */
    await this.userRoleModel.asociate(uid, role ?? 4);
    /* TODO: Send email of welcome */
    return {
      success: true,
      id: uid,
    };
  }
}
