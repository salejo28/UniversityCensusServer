import { Router } from "express";

import { UserControllers } from "controllers";
import { UserRoutesUI } from "types";
import {
  Authenticate,
  StaffOnly,
  ValidateNewUser,
  AdminOrBossOnly,
} from "middlewares";

class UserRoutes implements UserRoutesUI {
  public router: Router;
  private controllers: UserControllers;

  constructor() {
    this.router = Router({ strict: true });
    this.controllers = new UserControllers();

    this.getUser();
    this.createUser();
    this.updateBornDate();
    this.listOfficials();
    this.updateInfoUser();
    this.addAdditionalInfoOfficial();
    this.updateAdditionalInfoOfficial();
    this.uploadImageProfile();
    this.profile();
    this.search();
  }

  search() {
    this.router.get(
      "/search/user",
      [Authenticate, StaffOnly],
      this.controllers.Search.bind(this.controllers)
    );
  }

  getUser() {
    this.router.get(
      "/:uid",
      [Authenticate],
      this.controllers.GetUser.bind(this.controllers)
    );
  }

  profile() {
    this.router.get(
      "/profile/",
      [Authenticate],
      this.controllers.Profile.bind(this.controllers)
    );
  }

  createUser() {
    this.router.post(
      "/",
      [Authenticate, StaffOnly, ValidateNewUser],
      this.controllers.CreateUser.bind(this.controllers)
    );
  }

  updateBornDate() {
    this.router.put(
      "/bornDate/:uid",
      [Authenticate],
      this.controllers.UpdateBirthDate.bind(this.controllers)
    );
  }

  listOfficials() {
    this.router.get(
      "/officials/",
      [Authenticate, AdminOrBossOnly],
      this.controllers.ListOfficials.bind(this.controllers)
    );
  }

  updateInfoUser() {
    this.router.put(
      "/:uid",
      [Authenticate],
      this.controllers.UpdateInfoUser.bind(this.controllers)
    );
  }

  addAdditionalInfoOfficial() {
    this.router.post(
      "/additional-info",
      [Authenticate, AdminOrBossOnly],
      this.controllers.AddAdditionalInfoOfficial.bind(this.controllers)
    );
  }

  updateAdditionalInfoOfficial() {
    this.router.put(
      "/additional-info/update/:aid",
      [Authenticate, AdminOrBossOnly],
      this.controllers.UpdateAdditionalInfoOfficial.bind(this.controllers)
    );
  }

  uploadImageProfile() {
    this.router.post(
      "/image/upload/:uid/",
      [Authenticate],
      this.controllers.UploadFile.bind(this.controllers)
    );
  }
}

export default new UserRoutes().router;
