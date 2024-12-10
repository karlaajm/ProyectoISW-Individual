"use strict";
import { EntitySchema } from "typeorm";

const AnotacionSchema = new EntitySchema({
  name: "Anotacion",
  tableName: "anotaciones",
  columns: {
    ANOTACION_ID: {
      type: "int",
      primary: true,
      generated: true,
    },
    INSCRIPCION_ID: {
      type: "int",
      nullable: false,
    },
    CLASE_ASIGNATURA_ID: {
      type: "int",
      nullable: false,
    },
    DESCRIPCION: {
      type: "text",
      nullable: false,
    },
    FECHA: {
      type: "date",
      nullable: false,
    },
    TIPO: {
      type: "enum",
      enum: ["POSITIVA", "NEGATIVA", "OBSERVACION"],
      nullable: false,
    },
  },
  relations: {
    INSCRIPCION_ID: {
      target: "Inscripcion",
      type: "many-to-one",
      joinColumn: {
        name: "INSCRIPCION_ID",
      },
    },
    CLASE_ASIGNATURA_ID: {
      target: "ClaseAsignatura",
      type: "many-to-one",
      joinColumn: {
        name: "CLASE_ASIGNATURA_ID",
      },
    },
  },
});

export default AnotacionSchema;
