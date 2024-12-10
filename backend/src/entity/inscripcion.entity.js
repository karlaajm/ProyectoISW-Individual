"use strict";
import { EntitySchema } from "typeorm";

const InscripcionSchema = new EntitySchema({
  name: "Inscripcion",
  tableName: "inscripciones",
  columns: {
    INSCRIPCION_ID: {
      type: "int",
      primary: true,
      generated: true,
    },
    ESTUDIANTE_ID: {
      type: "int",
      nullable: false,
    },
    CLASE_ID: {
      type: "int",
      nullable: false,
    },
    PROMEDIO_GLOBAL: {
      type: "numeric",
      precision: 4,
      scale: 2,
      nullable: true,
    },
  },
  relations: {
    estudiante: {
      target: "Estudiante",
      type: "many-to-one",
      joinColumn: {
        name: "ESTUDIANTE_ID",
      },
    },
    clase: {
      target: "Clase",
      type: "many-to-one",
      joinColumn: {
        name: "CLASE_ID",
      },
    },
  },
});

export default InscripcionSchema;
