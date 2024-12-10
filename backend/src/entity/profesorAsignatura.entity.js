"use strict";
import { EntitySchema } from "typeorm";

const ProfesorAsignaturaSchema = new EntitySchema({
  name: "ProfesorAsignatura",
  tableName: "profesor_asignatura",
  columns: {
    PROFESOR_ID: {
      type: "int",
      primary: true,
    },
    ASIGNATURA_ID: {
      type: "int",
      primary: true,
    },
  },
  relations: {
    profesor: {
      target: "Profesor",
      type: "many-to-one",
      joinColumn: {
        name: "PROFESOR_ID",
      },
    },
    asignatura: {
      target: "Asignatura",
      type: "many-to-one",
      joinColumn: {
        name: "ASIGNATURA_ID",
      },
    },
  },
});

export default ProfesorAsignaturaSchema;
