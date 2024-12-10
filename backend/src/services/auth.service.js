"use strict";
import Usuario from "../entity/usuario.entity.js";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/configDb.js";
import { comparePassword } from "../helpers/bcrypt.helper.js";
import { ACCESS_TOKEN_SECRET } from "../config/configEnv.js";

export async function loginService(user) {
  try {
    const userRepository = AppDataSource.getRepository(Usuario);
    const { email, password } = user;

    const createErrorMessage = (dataInfo, message) => ({
      dataInfo,
      message,
    });

    const userFound = await userRepository.findOne({
      where: { CORREO: email },
    });

    if (!userFound) {
      return [
        null,
        createErrorMessage("email", "El correo electrónico es incorrecto"),
      ];
    }

    const isMatch = await comparePassword(password, userFound.CONTRASENIA);

    if (!isMatch) {
      return [
        null,
        createErrorMessage("password", "La contraseña es incorrecta"),
      ];
    }

    const payload = {
      RUT: userFound.RUT,
      NOMBRE: userFound.NOMBRE,
      APELLIDO_PATERNO: userFound.APELLIDO_PATERNO,
      APELLIDO_MATERNO: userFound.APELLIDO_MATERNO,
      CORREO: userFound.CORREO,
      TIPO_USUARIO: userFound.TIPO_USUARIO,
    };

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    return [accessToken, null];
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return [null, "Error interno del servidor"];
  }
}
