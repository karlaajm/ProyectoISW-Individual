"use strict";
import { EntitySchema } from "typeorm";

const ApoderadoSchema = new EntitySchema({
  name: "Apoderado",
  tableName: "apoderados",
  columns: {
    APODERADO_ID: {
      type: "int",
      primary: true,
      generated: true,
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
    CELULAR: {
      type: "varchar",
      length: 20,
      nullable: false,
    },
    ES_PRINCIPAL: {
      type: "boolean",
      default: false,
    },
    ACTIVO: {
      type: "boolean",
      default: true,
    },
  },
});

export default ApoderadoSchema;
