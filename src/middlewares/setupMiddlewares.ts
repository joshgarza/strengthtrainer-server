import express, { Express } from "express";
import { router } from "../routes/index.js";

export const setupMiddlewares = (app: Express): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api", router);
};
