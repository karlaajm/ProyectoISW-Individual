"use strict";
import { EntitySchema } from "typeorm";

const ClaseSchema = new EntitySchema({
  name: "Clase",
  tableName: "clases",
  columns: {
    CLASE_ID: {
      type: "int",
      primary: true,
      generated: true,
    },
    CURSO_ID: {
      type: "int",
      nullable: false,
    },
    NOMBRE: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    PERIODO_ACADEMICO: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
  },
  relations: {
    curso: {
      target: "Curso",
      type: "many-to-one",
      joinColumn: {
        name: "CURSO_ID",
      },
    },
  },
});

export default ClaseSchema;
