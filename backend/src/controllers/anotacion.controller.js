"use strict";
import {
  actualizarAnotacionService,
  crearAnotacionService,
  eliminarAnotacionService,
  obtenerAnotacionesService,
} from "../services/anotacion.service.js";
import {
  anotacionBodyValidation,
  anotacionQueryValidation,
} from "../validations/anotacion.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function obtenerAnotacion(req, res) {
  try {
    handleSuccess(res, 200, "Anotación encontrada", {});
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function obtenerAnotaciones(req, res) {
  try {
    const [anotaciones, errorAnotaciones] = await obtenerAnotacionesService();

    if (errorAnotaciones) return handleErrorClient(res, 404, errorAnotaciones);

    anotaciones.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Anotaciones encontrados", anotaciones);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function crearAnotacion(req, res) {
  try {
    const { body } = req;

    const { error } = anotacionBodyValidation.validate(body);

    if (error)
      return handleErrorClient(
        res,
        400,
        "Error de validación en los datos enviados",
        error.message,
      );

    const [nuevaAnotacion, errorNuevaAnotacion] =
      await crearAnotacionService(body);

    if (errorNuevaAnotacion)
      return handleErrorClient(
        res,
        400,
        "Error creando la anotación",
        errorNuevaAnotacion,
      );

    handleSuccess(res, 201, "Anotación creada con éxito", nuevaAnotacion);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function actualizarAnotacion(req, res) {
  try {
    const { id } = req.query;
    const { body } = req;
    console.log(body);

    const { error: queryError } = anotacionQueryValidation.validate({
      id,
    });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const { error: bodyError } = anotacionBodyValidation.validate(body);

    if (bodyError)
      return handleErrorClient(
        res,
        400,
        "Error de validación en los datos enviados",
        bodyError.message,
      );

    const [anotacion, anotacionError] = await actualizarAnotacionService(
      { id },
      body,
    );

    if (anotacionError)
      return handleErrorClient(
        res,
        400,
        "Error modificando la anotación",
        anotacionError,
      );

    handleSuccess(res, 200, "Anotación modificada correctamente", anotacion);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function eliminarAnotacion(req, res) {
  try {
    const { id } = req.query;

    const { error: queryError } = anotacionQueryValidation.validate({
      id,
    });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const [eliminarAnotacion, errorEliminarAnotacion] =
      await eliminarAnotacionService({
        id,
      });

    if (errorEliminarAnotacion)
      return handleErrorClient(
        res,
        404,
        "Error no se ha eliminado la anotación",
        errorEliminarAnotacion,
      );

    handleSuccess(
      res,
      200,
      "Anotación eliminada correctamente",
      eliminarAnotacion,
    );
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
