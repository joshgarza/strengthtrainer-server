import { client } from "../../config/db.js";
type DbResponse = any; // Adjust this type based on your expected DB response type

export const insert = async (
  table: string,
  columns: string[],
  values: any[],
  returning: string[] = ["id"] // By default, return 'id'
): Promise<DbResponse> => {
  const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
  const columnsString = columns.join(", ");
  const returningString = returning.join(", ");

  const query = `
    INSERT INTO ${table} (${columnsString})
    VALUES (${placeholders})
    RETURNING ${returningString}
  `;

  try {
    console.log("Executing query:", query, "With values:", values);
    const res = await client.query(query, values);
    return res.rows[0]; // return first row of the result
  } catch (err) {
    console.error("Error executing insert query:", err);
    throw err;
  }
};

export const select = async (
  table: string,
  columns: string[],
  whereClause: string,
  values: any[]
): Promise<DbResponse[]> => {
  const columnsString = columns.join(", ");

  const query = `
    SELECT ${columnsString}
    FROM ${table}
    WHERE ${whereClause}
  `;

  try {
    console.log("Executing query:", query, "With values:", values);
    const res = await client.query(query, values);
    return res.rows; // return all rows
  } catch (err) {
    console.error("Error executing select query:", err);
    throw err;
  }
};
