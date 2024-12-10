"use strict";
import { EntitySchema } from "typeorm";

const EstudianteApoderadoSchema = new EntitySchema({
  name: "EstudianteApoderado",
  tableName: "estudiante_apoderado",
  columns: {
    ESTUDIANTE_ID: {
      type: "int",
      primary: true,
    },
    APODERADO_ID: {
      type: "int",
      primary: true,
    },
  },
  relations: {
    ESTUDIANTE: {
      target: "Estudiante",
      type: "many-to-one",
      joinColumn: {
        name: "ESTUDIANTE_ID",
      },
    },
    APODERADO: {
      target: "Apoderado",
      type: "many-to-one",
      joinColumn: {
        name: "APODERADO_ID",
      },
    },
  },
});

export default EstudianteApoderadoSchema;
