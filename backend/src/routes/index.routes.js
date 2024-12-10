"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import anotacionRoutes from "./anotacion.routes.js";
import authRoutes from "./auth.routes.js";

const router = Router();

router
  .use("/auth", authRoutes)
  .use("/user", userRoutes)
  .use("/anotaciones", anotacionRoutes);

export default router;
