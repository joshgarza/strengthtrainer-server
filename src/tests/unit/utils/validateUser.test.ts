import { JwtPayload } from "jsonwebtoken";
import { validateRequest } from "../../../utils/index.js";
import { Request, Response, NextFunction } from "express";
import { assert } from "console";

describe("validateUser", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks to avoid interference between tests
  });

  it("should validate a user when the request id matches the user id", async () => {
    const mockUser = {
      id: "1",
    } as JwtPayload;

    const mockRequest = buildMockRequest(mockUser);
    const mockResponse = new MockResponse() as unknown as Response;
    const next = jest.fn();
    validateRequest(mockRequest, mockResponse, next);

    expect(next).toHaveBeenCalled();
  });

  it("should fail when no user id", async () => {
    const mockUser = {} as JwtPayload;

    const mockRequest = buildMockRequest(mockUser);
    const mockResponse = new MockResponse() as unknown as Response;
    const next = jest.fn();
    const actualResponse = await validateRequest(mockRequest, mockResponse, next);

    expect(actualResponse?.statusCode).toEqual(403);
    expect(next).toHaveBeenCalledTimes(0);
  });

  // write POST test
});

function buildMockRequest(mockUser: JwtPayload) {
  return {
    params: {
      id: 1,
    },
    user: mockUser,
  } as unknown as Request;
}

class MockResponse {
  statusCode: number = 0;

  status(statusCode: number) {
    this.statusCode = statusCode;
    return this;
  }

  json(body: Object) {
    return this;
  }
}
