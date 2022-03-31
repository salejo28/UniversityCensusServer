/* eslint-disable @typescript-eslint/no-explicit-any */
import mysql from "mysql";

import { DB_DATABASENAME, DB_HOST, DB_USER, DB_PASSWORD } from "keys";

const params: mysql.ConnectionConfig = {
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_DATABASENAME,
};

const Connect = async (): Promise<mysql.Connection> =>
  new Promise<mysql.Connection>((resolve, reject) => {
    const connection = mysql.createConnection(params);
    connection.connect((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(connection);
    });
  });

const Query = async (
  connection: mysql.Connection,
  query: string | mysql.QueryOptions,
  variables?: any
): Promise<any[]> =>
  new Promise<any[]>((resolve, reject) => {
    connection.query(query, variables, (error, result) => {
      if (error) {
        console.log(
          "\x1b[41m",
          "Query executed",
          query,
          "failed",
          "\x1b[0m",
          "\n"
        );
        reject(error);
        return;
      }
      console.log(
        "\x1b[32m",
        "Query executed",
        query,
        "success",
        "\x1b[0m",
        "\n"
      );
      resolve(result);
    });
  });

export { Connect, Query };
