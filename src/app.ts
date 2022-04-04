import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet"; // This sets various HTTP headers that can help defend against common web app security vulnerabilities, such as xss attacks.
import hpp from "hpp"; // This protects against HTTP Parameter Pollution attacks
/* import csurf from "csurf"; */ // This protects against Cross-site request forgery. This needs to be used after our cookie-session connect.
import limiter from "express-rate-limit";
import session from "cookie-session";
import CookieParser from "cookie-parser";

import { SECRET_TOKEN_SESSION_COOKIE } from "keys";
import { methods } from "appConstants";
import { originAccept } from "helpers";
import { AuthenticateApiVerify } from "middlewares";
import { myOnwEmitter } from "subscribers";
import { AuthRoutes, TypeIdRoutes } from "routes";

export default class App {
  private app: Application;
  private port: number;

  constructor(port?: number) {
    this.app = express();
    this.port = port as number;

    this.Settings();
    this.Middlewares();
    this.Routes();
  }

  private Settings() {
    this.app.set("port", this.port);
  }

  private Middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(hpp());
    this.app.use(
      session({
        name: "session",
        secret: SECRET_TOKEN_SESSION_COOKIE,
      })
    );
    this.app.use(CookieParser());
    /* this.app.use(csurf({ cookie: true })); */
    this.app.use(
      limiter({
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
      })
    );
    this.app.use(
      cors({
        credentials: true,
        methods,
        origin: originAccept,
      })
    );
    this.app.use("*", AuthenticateApiVerify);
  }

  private Routes() {
    this.app.use("/api/auth", AuthRoutes);
    this.app.use("/api/typeIds", TypeIdRoutes);
  }

  public async ProofDB() {
    /* const connection = await Connect(); */
    myOnwEmitter.emit("proof", "This is my own event subscriber");
    /* const result = await Query(connection, "SELECT * FROM user");
    console.log(result);
    connection.end(); */
  }

  public async listen() {
    await new Promise<void>((resolve) =>
      this.app.listen(this.app.get("port"), resolve)
    );
    console.log(`🚀 Server ready at http://localhost:${this.app.get("port")}`);
  }
}
