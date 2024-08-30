import express, { Express } from "express";
import { authRouter, openRouter } from "../routes/index.js";

export const setupMiddlewares = (app: Express): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/auth", authRouter);
  app.use("/api/open", openRouter);
};
