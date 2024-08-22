import { client } from "../config/db.js";

export const userModels = {
  // export const models = {
  //   test: async () => {
  //     const result = await client.query("SELECT NOW()");
  //     return result.rows[0].now;
  //   },
  // };
  register: async () => {},
  login: async () => {},
  passwordReset: async () => {},
  resetPassword: async () => {},
};
