"use strict";
import { EntitySchema } from "typeorm";

const ProfesorSchema = new EntitySchema({
  name: "Profesor",
  tableName: "profesores",
  columns: {
    PROFESOR_ID: {
      type: "int",
      primary: true,
      generated: true,
    },
    USUARIO_ID: {
      type: "int",
      nullable: false,
    },
  },
  relations: {
    usuario: {
      target: "Usuario",
      type: "one-to-one",
      joinColumn: {
        name: "USUARIO_ID",
      },
    },
  },
});

export default ProfesorSchema;
