"use strict";
import Joi from "joi";

export const anotacionQueryValidation = Joi.object({
  id: Joi.number().integer().positive().messages({
    "number.base": "El ID de la anotación debe ser un número.",
    "number.integer": "El ID de la anotación debe ser un número entero.",
    "number.positive": "El ID de la anotación debe ser un número positivo.",
  }),
})
  .or("id")
  .messages({
    "object.missing": "Debes proporcionar el id.",
  });

export const anotacionBodyValidation = Joi.object({
  INSCRIPCION_ID: Joi.number().integer().positive().required().messages({
    "number.base": "El campo INSCRIPCION_ID debe ser un número.",
    "number.integer": "El campo INSCRIPCION_ID debe ser un número entero.",
    "number.positive": "El campo INSCRIPCION_ID debe ser un número positivo.",
    "any.required": "El campo INSCRIPCION_ID es obligatorio.",
  }),
  CLASE_ASIGNATURA_ID: Joi.number().integer().positive().required().messages({
    "number.base": "El campo CLASE_ASIGNATURA_ID debe ser un número.",
    "number.integer": "El campo CLASE_ASIGNATURA_ID debe ser un número entero.",
    "number.positive":
      "El campo CLASE_ASIGNATURA_ID debe ser un número positivo.",
    "any.required": "El campo CLASE_ASIGNATURA_ID es obligatorio.",
  }),
  FECHA: Joi.date().iso().required().messages({
    "date.base": "La fecha debe ser una fecha válida.",
    "any.required": "El campo fecha es obligatorio.",
  }),
  DESCRIPCION: Joi.string().min(5).max(255).required().messages({
    "string.empty": "La descripción no puede estar vacía.",
    "string.min": "La descripción debe tener como mínimo 5 caracteres.",
    "string.max": "La descripción debe tener como máximo 255 caracteres.",
    "any.required": "El campo descripcion es obligatorio.",
  }),
  TIPO: Joi.string()
    .valid("POSITIVA", "NEGATIVA", "OBSERVACION")
    .required()
    .messages({
      "string.empty": "El tipo no puede estar vacío.",
      "any.only": "El tipo debe ser 'POSITIVA', 'NEGATIVA' o 'OBSERVACION'.",
      "any.required": "El campo tipo es obligatorio.",
    }),
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
  });
