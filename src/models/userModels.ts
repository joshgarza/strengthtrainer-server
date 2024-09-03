import { client } from "../config/db.js";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  authorizedUserIds: number[];
}

export const userModels = {
  addAuthorizedId: async (userId: string, coachId: string) => {
    const authQuery = `
      INSERT INTO authorized_user_ids (user_id, coach_id)
      VALUES ($1, $2)
      RETURNING id
    `;
    const authValues = [userId, coachId];

    try {
      const authRes = await client.query(authQuery, authValues);
      return authRes.rows[0];
    } catch (err) {
      console.error("Error inserting into authorized_user_ids", err);
      throw err;
    }
  },
  getAuthorizedIds: async (userId: string) => {
    const query = `
      SELECT user_id FROM authorized_user_ids WHERE coach_id = $1
    `;
    const value = [userId];

    try {
      const res = await client.query(query, value);
      return res.rows.map((obj) => obj.user_id);
    } catch (err) {
      console.error("error getting authorized ids");
      throw err;
    }
  },
  getUserData: async (email: string): Promise<UserData> => {
    try {
      await client.query("BEGIN");

      const userQuery = `SELECT id, name, email, role FROM users WHERE email = $1`;
      const userValue = [email];

      const userRes = await client.query(userQuery, userValue);
      const userId = userRes.rows[0].id;
      const authRes = await userModels.getAuthorizedIds(userId);
      console.log(authRes, "authres");

      await client.query("COMMIT");

      const userData: UserData = {
        id: userRes.rows[0].id,
        name: userRes.rows[0].name,
        email: userRes.rows[0].email,
        role: userRes.rows[0].role,
        authorizedUserIds: authRes,
      };

      return userData;
    } catch (err) {
      console.error("Error executing query", err);
      throw err;
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
      throw err;
    }
  },
  register: async (name: string, email: string, passwordHash: string, role: string): Promise<UserData> => {
    try {
      await client.query("BEGIN");

      const userQuery = `
        INSERT INTO users (name, email, password_hash, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, role
      `;
      const userValues = [name, email, passwordHash, role];

      const userRes = await client.query(userQuery, userValues);
      const userId = userRes.rows[0].id;

      const authRes = await userModels.addAuthorizedId(userId, userId);

      await client.query("COMMIT");

      const userData: UserData = {
        id: userRes.rows[0].id,
        name: userRes.rows[0].name,
        email: userRes.rows[0].email,
        role: userRes.rows[0].role,
        authorizedUserIds: [authRes.id],
      };

      return userData;
    } catch (err) {
      await client.query("ROLLBACK");
      console.error("Error during registration transaction", err);
      throw err;
    }
  },
  login: async () => {},
  passwordReset: async () => {},
  resetPassword: async () => {},
};
