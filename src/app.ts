import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";

import { methods } from "appConstants";
import { originAccept } from "helpers";
import { Connect, Query } from "config";
import { AuthenticateApiVerify } from "middlewares";

export default class App {
  private app: Application;
  private port: number;

  constructor(port?: number) {
    this.app = express();
    this.port = port as number;

    this.Settings();
    this.Middlewares();
  }

  private Settings() {
    this.app.set("port", this.port);
  }

  private Middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      cors({
        credentials: true,
        methods,
        origin: originAccept,
      })
    );
    this.app.use("*", AuthenticateApiVerify);
  }

  public async ProofDB() {
    const connection = await Connect();
    const result = await Query(connection, "SELECT * FROM user");
    console.log(result);
  }

  public async listen() {
    await new Promise<void>((resolve) =>
      this.app.listen(this.app.get("port"), resolve)
    );
    console.log(`🚀 Server ready at http://localhost:${this.app.get("port")}`);
  }
}
