"use strict";
import Usuario from "../entity/usuario.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { comparePassword, encryptPassword } from "../helpers/bcrypt.helper.js";

export async function getUserService(query) {
  try {
    const { rut, id, email } = query;

    const userRepository = AppDataSource.getRepository(Usuario);

    const userFound = await userRepository.findOne({
      where: [{ id: id }, { rut: rut }, { email: email }],
    });

    if (!userFound) return [null, "Usuario no encontrado"];

    const { password, ...userData } = userFound;

    return [userData, null];
  } catch (error) {
    console.error("Error obtener el usuario:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getUsersService() {
  try {
    const userRepository = AppDataSource.getRepository(Usuario);

    const users = await userRepository.find();

    if (!users || users.length === 0) return [null, "No hay usuarios"];

    const usersData = users.map(({ password, ...user }) => user);

    return [usersData, null];
  } catch (error) {
    console.error("Error al obtener a los usuarios:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateUserService(query, body) {
  try {
    const { rut } = query;

    const userRepository = AppDataSource.getRepository(Usuario);

    const userFound = await userRepository.findOne({
      where: [{ RUT: rut }],
    });

    if (!userFound) return [null, "Usuario no encontrado"];

    // const existingUser = await userRepository.findOne({
    //   where: [{ rut: body.rut }, { email: body.email }],
    // });

    // if (existingUser && existingUser.id !== userFound.id) {
    //   return [null, "Ya existe un usuario con el mismo rut o email"];
    // }

    if (body.password) {
      const matchPassword = await comparePassword(
        body.password,
        userFound.CONTRASENIA,
      );

      if (!matchPassword) return [null, "La contraseña no coincide"];
    }

    let nombre = body.nombreCompleto.split(" ")[0];
    let ap_paterno = body.nombreCompleto.split(" ")[1];
    let ap_materno = body.nombreCompleto.split(" ")[2];

    const dataUserUpdate = {
      NOMBRE: nombre,
      APELLIDO_PATERNO: ap_paterno,
      APELLIDO_MATERNO: ap_materno,
      RUT: body.rut,
      CORREO: body.email,
      TIPO_USUARIO: body.rol.toUpperCase(),
    };

    if (body.newPassword && body.newPassword.trim() !== "") {
      dataUserUpdate.CONTRASENIA = await encryptPassword(body.newPassword);
    }

    await userRepository.update({ RUT: userFound.RUT }, dataUserUpdate);

    const userData = await userRepository.findOne({
      where: { RUT: userFound.RUT },
    });

    if (!userData) {
      return [null, "Usuario no encontrado después de actualizar"];
    }

    const { CONTRASENIA, ...userUpdated } = userData;

    return [userUpdated, null];
  } catch (error) {
    console.error("Error al modificar un usuario:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteUserService(query) {
  try {
    const { rut } = query;

    const userRepository = AppDataSource.getRepository(Usuario);

    const userFound = await userRepository.findOne({
      where: [{ RUT: rut }],
    });

    if (!userFound) return [null, "Usuario no encontrado"];

    if (userFound.TIPO_USUARIO === "ADMINISTRADOR") {
      return [null, "No se puede eliminar un usuario con rol de administrador"];
    }

    const userDeleted = await userRepository.remove(userFound);

    const { CONTRASENIA, ...dataUser } = userDeleted;

    return [dataUser, null];
  } catch (error) {
    console.error("Error al eliminar un usuario:", error);
    return [null, "Error interno del servidor"];
  }
}
