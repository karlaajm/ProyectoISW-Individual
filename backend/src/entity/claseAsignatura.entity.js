"use strict";
import { EntitySchema } from "typeorm";

const ClaseAsignaturaSchema = new EntitySchema({
  name: "ClaseAsignatura",
  tableName: "clase_asignatura",
  columns: {
    CLASE_ASIGNATURA_ID: {
      type: "int",
      primary: true,
      generated: true,
    },
    CLASE_ID: {
      type: "int",
      nullable: false,
    },
    ASIGNATURA_ID: {
      type: "int",
      nullable: false,
    },
    PROFESOR_ID: {
      type: "int",
      nullable: false,
    },
  },
  relations: {
    clase: {
      target: "Clase",
      type: "many-to-one",
      joinColumn: {
        name: "CLASE_ID",
      },
    },
    asignatura: {
      target: "Asignatura",
      type: "many-to-one",
      joinColumn: {
        name: "ASIGNATURA_ID",
      },
    },
    profesor: {
      target: "Profesor",
      type: "many-to-one",
      joinColumn: {
        name: "PROFESOR_ID",
      },
    },
  },
});

export default ClaseAsignaturaSchema;
