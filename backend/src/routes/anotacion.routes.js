"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  actualizarAnotacion,
  crearAnotacion,
  eliminarAnotacion,
  obtenerAnotacion,
  obtenerAnotaciones,
} from "../controllers/anotacion.controller.js";

const router = Router();

router.use(authenticateJwt);

router
  .get("/", obtenerAnotaciones)
  .get("/detalle/", obtenerAnotacion)
  .post("/crear/", crearAnotacion)
  .patch("/actualizar/", actualizarAnotacion)
  .delete("/eliminar/", eliminarAnotacion);

export default router;
