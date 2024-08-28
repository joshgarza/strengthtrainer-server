import { client } from "../config/db.js";

export const userModels = {
  getUserData: async (email: string) => {
    const query = `SELECT id, name, email, role FROM users WHERE email = $1`;
    const value = [email];

    try {
      const res = await client.query(query, value);
      return res.rows[0];
    } catch (err) {
      console.error("Error executing query", err);
      return err;
    }
  },
  getUserHash: async (email: string) => {
    const query = `SELECT password_hash FROM users WHERE email = $1`;
    const value = [email];

    try {
      const res = await client.query(query, value);
      return res.rows[0].password_hash;
    } catch (err) {
      console.error("Error executing query", err);
      return err;
    }
  },
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
