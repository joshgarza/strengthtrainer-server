import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err;
  }
};

export const compareHash = async (password: string, hash: string) => {
  try {
    const result = await bcrypt.compare(password, hash);
    return result;
  } catch (err) {
    console.error("Error comparing hash and password:", err);
    throw err;
  }
};
