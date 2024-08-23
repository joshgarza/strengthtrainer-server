import { client } from "../config/db.js";

export const userModels = {
  // export const models = {
  //   test: async () => {
  //     const result = await client.query("SELECT NOW()");
  //     return result.rows[0].now;
  //   },
  // };
  register: async (
    name: string,
    email: string,
    passwordHash: string,
    role: string
  ) => {
    const query = `INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [name, email, passwordHash, role];

    try {
      const res = await client.query(query, values);
      return res.rows[0];
    } catch (err) {
      console.error("Error executing query", err);
      throw err;
    }
  },
  login: async () => {},
  passwordReset: async () => {},
  resetPassword: async () => {},
};
