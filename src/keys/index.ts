import { config } from "dotenv";

config({
  path: ".env",
});

export const PRODUCTION = process.env.NODE_ENV === "production";
export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASENAME = process.env.DB_DATABASENAME;
export const SECRET_TOKEN_AUTHORIZATION =
  process.env.SECRET_TOKEN_AUTHORIZATION_API;
export const SECRET_TOKEN_SESSION_COOKIE =
  process.env.SECRET_TOKEN_SESSION_COOKIE;
export const SECRET_TOKEN = process.env.SECRET_TOKEN;
export const SECRET_REFRESH_TOKEN = process.env.SECRET_REFRESH_TOKEN;
export const SECRET_KEY_CRYPTO = process.env.SECRET_KEY_CRYPTO;
