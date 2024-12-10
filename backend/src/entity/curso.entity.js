"use strict";
import { EntitySchema } from "typeorm";

const CursoSchema = new EntitySchema({
  name: "Curso",
  tableName: "cursos",
  columns: {
    CURSO_ID: {
      type: "int",
      primary: true,
      generated: true,
    },
    NOMBRE: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
  },
});

export default CursoSchema;
