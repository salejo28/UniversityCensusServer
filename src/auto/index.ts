import { UserService } from "services";

export const AddUserAdmin = async () => {
  try {
    const service = new UserService();
    const user = {
      firstName: "admin",
      lastName: "admin",
      middleName: "admin",
      surname: "admin",
      email: "admin@admin.com",
      idType: "Cedula de Ciudadania",
      idNumber: "123456789",
      password: "password",
    };
    const existUser = await service.GetUserByEmail(user.email);
    if (!existUser) {
      await service.CreateUser(user, 1);
    }
  } catch (error) {
    console.log("Error AddUserAdmin =>", error);
    throw new Error(error as string);
  }
};
