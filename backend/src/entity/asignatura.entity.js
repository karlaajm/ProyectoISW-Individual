"use strict";
import { EntitySchema } from "typeorm";

const AsignaturaSchema = new EntitySchema({
  name: "Asignatura",
  tableName: "asignaturas",
  columns: {
    ASIGNATURA_ID: {
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

export default AsignaturaSchema;
