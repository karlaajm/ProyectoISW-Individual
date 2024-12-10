"use strict";
import { EntitySchema } from "typeorm";

const UsuarioSchema = new EntitySchema({
  name: "Usuario",
  tableName: "usuarios",
  columns: {
    USUARIO_ID: {
      type: "int",
      primary: true,
      generated: true,
    },
    RUT: {
      type: "varchar",
      length: 12,
      nullable: false,
      unique: true,
    },
    NOMBRE: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    APELLIDO_PATERNO: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    APELLIDO_MATERNO: {
      type: "varchar",
      length: 50,
      nullable: true,
    },
    CORREO: {
      type: "varchar",
      length: 100,
      nullable: false,
      unique: true,
    },
    CONTRASENIA: {
      type: "varchar",
      nullable: false,
    },
    TIPO_USUARIO: {
      type: "enum",
      enum: ["ADMINISTRADOR", "PROFESOR", "ESTUDIANTE"],
      nullable: false,
    },
  },
});

export default UsuarioSchema;
