import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log("Hashed password:", hash);
    return hash;
  } catch (err) {
    console.error("Error hashing password:", err);
    return "";
  }
};

export const compareHash = async (password: string, hash: string) => {
  try {
    const result = await bcrypt.compare(password, hash);
    console.log("Comparison result:", result);
    return result;
  } catch (err) {
    console.error("Error comparing hash and password:", err);
  }
};
