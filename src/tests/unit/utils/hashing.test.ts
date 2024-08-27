import { hashPassword } from "../../../utils/async/hashing.js";
import bcrypt from "bcrypt";

// Mock bcrypt.hash function
jest.mock("bcrypt");

describe("hashPassword", () => {
  const mockPassword = "examplePassword";

  afterEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks to avoid interference between tests
  });

  it("should return a valid hash when bcrypt.hash is successful", async () => {
    const mockHash = "hashedPassword";

    // Explicitly cast bcrypt.hash as a Jest mock function
    (bcrypt.hash as jest.Mock).mockResolvedValue(mockHash);

    const result = await hashPassword(mockPassword);

    expect(result).toBe(mockHash);
    expect(bcrypt.hash).toHaveBeenCalledWith(mockPassword, 10);
  });

  it("should return an empty string and log an error when bcrypt.hash fails", async () => {
    const mockError = new Error("Hashing error");

    // Mock bcrypt.hash to reject with an error
    (bcrypt.hash as jest.Mock).mockRejectedValue(mockError);

    // Mock console.error to verify error logging
    console.error = jest.fn();

    const result = await hashPassword(mockPassword);

    expect(result).toBe(""); // Should return an empty string on error
    expect(bcrypt.hash).toHaveBeenCalledWith(mockPassword, 10);
    expect(console.error).toHaveBeenCalledWith(
      "Error hashing password:",
      mockError
    );
  });
});
