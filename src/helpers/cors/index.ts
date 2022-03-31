/* eslint-disable @typescript-eslint/no-explicit-any */
import { withelist } from "appConstants";

export const originAccept = (origin: string | undefined | null, cb: any) => {
  if (withelist.indexOf(origin as string) !== -1 || !origin) {
    cb(null, true);
  } else {
    cb(new Error("Not allowed by CORS"));
  }
};
