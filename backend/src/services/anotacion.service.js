"use strict";
import Anotacion from "../entity/anotacion.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { comparePassword, encryptPassword } from "../helpers/bcrypt.helper.js";

export async function obtenerAnotacionService(query) {
  try {
    const { rut, id, email } = query;

    const RepositorioAnotaciones = AppDataSource.getRepository(Anotacion);

    const anotacionEncontrada = await RepositorioAnotaciones.findOne({
      where: [
        { ANOTACION_ID: id },
        { DESCRIPCION: descripcion },
        { email: email },
      ],
    });

    if (!userFound) return [null, "Usuario no encontrado"];

    const { password, ...userData } = userFound;

    return [userData, null];
  } catch (error) {
    console.error("Error obtener el usuario:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function obtenerAnotacionesService() {
  try {
    const RepositorioAnotaciones = AppDataSource.getRepository("Anotacion");

    const anotaciones = await RepositorioAnotaciones.find({
      relations: {
        INSCRIPCION_ID: {
          estudiante: {
            usuario: true, // Incluye los datos del usuario relacionados al estudiante
          },
        },
        CLASE_ASIGNATURA_ID: {
          asignatura: true, // Incluye los datos de la asignatura
        },
      },
    });

    if (anotaciones.length === 0) return [[], null];

    const anotacionesProcesadas = anotaciones.map((anotacion) => {
      const usuario = anotacion.INSCRIPCION_ID?.estudiante?.usuario;
      const asignatura = anotacion.CLASE_ASIGNATURA_ID?.asignatura;

      // Concatenar nombre completo del estudiante
      const nombreCompletoEstudiante = usuario
        ? `${usuario.NOMBRE} ${usuario.APELLIDO_PATERNO} ${usuario.APELLIDO_MATERNO}`
        : "Sin nombre";

      const usuarioSinContrasenia = usuario
        ? {
            ...usuario,
            CONTRASENIA: undefined, // Excluir este campo
          }
        : null;

      return {
        ...anotacion,
        NOMBRE_COMPLETO_ESTUDIANTE: nombreCompletoEstudiante,
        NOMBRE_ASIGNATURA: asignatura?.NOMBRE || "Sin asignatura",
        usuario: usuarioSinContrasenia,
      };
    });

    return [anotacionesProcesadas, null];
  } catch (error) {
    console.error("Error al obtener las anotaciones:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function crearAnotacionService(anotacion) {
  try {
    const RepositorioAnotaciones = AppDataSource.getRepository(Anotacion);

    const nuevaAnotacion = RepositorioAnotaciones.create(anotacion);
    const anotacionGuardada = await RepositorioAnotaciones.save(nuevaAnotacion);

    return [anotacionGuardada, null];
  } catch (error) {
    console.error("Error al registrar un usuario", error);
    return [null, "Error interno del servidor"];
  }
}

export async function actualizarAnotacionService(query, body) {
  try {
    const { id } = query;

    const RepositorioAnotaciones = AppDataSource.getRepository(Anotacion);

    const anotacionEncontrada = await RepositorioAnotaciones.findOne({
      where: [{ ANOTACION_ID: id }],
      relations: {
        INSCRIPCION_ID: { estudiante: { usuario: true } },
        CLASE_ASIGNATURA_ID: { asignatura: true },
      },
    });

    if (!anotacionEncontrada) return [null, "Anotación no encontrada"];

    const dataAnotacionUpdate = {
      TIPO: body.TIPO,
      DESCRIPCION: body.DESCRIPCION,
      FECHA: body.FECHA,
    };

    await RepositorioAnotaciones.update(
      { ANOTACION_ID: anotacionEncontrada.ANOTACION_ID },
      dataAnotacionUpdate,
    );

    const dataAnotacion = await RepositorioAnotaciones.findOne({
      where: { ANOTACION_ID: id },
      relations: {
        INSCRIPCION_ID: { estudiante: { usuario: true } },
        CLASE_ASIGNATURA_ID: { asignatura: true },
      },
    });

    if (!dataAnotacion) {
      return [null, "Anotación no encontrada después de actualizar"];
    }

    const usuario = dataAnotacion.INSCRIPCION_ID?.estudiante?.usuario;
    const asignatura = dataAnotacion.CLASE_ASIGNATURA_ID?.asignatura;

    const nombreCompletoEstudiante = usuario
      ? `${usuario.NOMBRE} ${usuario.APELLIDO_PATERNO} ${usuario.APELLIDO_MATERNO}`
      : "Sin nombre";
    const nombreAsignatura = asignatura?.NOMBRE || "Sin asignatura";

    const anotacionProcesada = {
      ANOTACION_ID: dataAnotacion.ANOTACION_ID,
      INSCRIPCION_ID: dataAnotacion.INSCRIPCION_ID,
      CLASE_ASIGNATURA_ID: dataAnotacion.CLASE_ASIGNATURA_ID,
      DESCRIPCION: dataAnotacion.DESCRIPCION,
      FECHA: dataAnotacion.FECHA,
      TIPO: dataAnotacion.TIPO,
      NOMBRE_COMPLETO_ESTUDIANTE: nombreCompletoEstudiante,
      NOMBRE_ASIGNATURA: nombreAsignatura,
    };

    return [anotacionProcesada, null];
  } catch (error) {
    console.error("Error al modificar la anotación:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function eliminarAnotacionService(query) {
  try {
    const { id } = query;

    const RepositorioAnotaciones = AppDataSource.getRepository(Anotacion);

    const anotacionEncontrada = await RepositorioAnotaciones.findOne({
      where: [{ ANOTACION_ID: id }],
    });

    if (!anotacionEncontrada) return [null, "Anotación no encontrada"];

    const AnotacionEliminada =
      await RepositorioAnotaciones.remove(anotacionEncontrada);

    return [AnotacionEliminada, null];
  } catch (error) {
    console.error("Error al eliminar la anotación:", error);
    return [null, "Error interno del servidor"];
  }
}
