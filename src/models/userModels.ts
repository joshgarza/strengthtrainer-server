import { client } from "../config/db.js";

export const userModels = {
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
    /**
     * what's involved in registering?
     * - checking to see if there's a conflict in the db for the email
     * - email is unique
     * -- email validation
     * - hash the password
     * - insert into users: name, email, hash, and role
     */

    // check unique email

    // validate email

    //

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

/**
 * thinking of this as a class instead of just a basic object
 *
 * userModels can have a constructor that initializes the client object in /config/db.js
 * methods to do basic operations can be abstracted to a common class that can be used across various models
 * maybe we have a generic
 */
