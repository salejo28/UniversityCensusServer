import { AuthServiceUI, RegisterPayload, LoginPayload } from "types";
import { UserModel } from "models";
import { UserService } from "services";
import { VerifyPassword } from "security";

export default class AuthService implements AuthServiceUI {
  private userModel: UserModel;
  private userService: UserService;

  constructor() {
    this.userModel = new UserModel();
    this.userService = new UserService();
  }

  public async Login(payload: LoginPayload) {
    const user = await this.userModel.getOne({ email: payload.email });
    if (!user) {
      return false;
    }

    const matchedPasswords = await VerifyPassword(
      payload.password,
      user.password
    );
    if (!matchedPasswords) {
      return false;
    }
    return user.id as number;
  }

  public async Register(payload: RegisterPayload) {
    const { success, id, path } = await this.userService.CreateUser(payload);
    if (!success) {
      return {
        success,
        path: path as string,
      };
    }

    return {
      success: true,
      id,
    };
  }
}
