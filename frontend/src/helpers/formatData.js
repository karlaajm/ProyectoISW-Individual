import { startCase } from "lodash";
import { format as formatRut } from "rut.js";
import { format as formatTempo } from "@formkit/tempo";

export function formatUserData(user) {
  return {
    ...user,
    nombreCompleto: `${startCase(user.NOMBRE)} ${startCase(
      user.APELLIDO_PATERNO
    )} ${startCase(user.APELLIDO_MATERNO)}`,
    rol: startCase(user.TIPO_USUARIO),
    email: user.CORREO,
    rut: formatRut(user.RUT),
    createdAt: formatTempo(user.createdAt, "DD-MM-YYYY"),
  };
}

export function convertirMinusculas(obj) {
  for (let key in obj) {
    if (typeof obj[key] === "string") {
      obj[key] = obj[key].toLowerCase();
    }
  }
  return obj;
}

export function formatPostUpdate(user) {
  return {
    nombreCompleto: `${startCase(user.NOMBRE)} ${startCase(
      user.APELLIDO_PATERNO
    )} ${startCase(user.APELLIDO_MATERNO)}`,
    rol: startCase(user.TIPO_USUARIO),
    email: user.CORREO,
    rut: formatRut(user.RUT),
    createdAt: formatTempo(user.createdAt, "DD-MM-YYYY"),
  };
}
