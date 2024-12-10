"use strict";
import { EntitySchema } from "typeorm";

const EstudianteSchema = new EntitySchema({
  name: "Estudiante",
  tableName: "estudiantes",
  columns: {
    ESTUDIANTE_ID: {
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

export default EstudianteSchema;
