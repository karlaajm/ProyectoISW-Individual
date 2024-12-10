"use strict";
import { EntitySchema } from "typeorm";

const ReunionApoderadoSchema = new EntitySchema({
  name: "ReunionApoderado",
  tableName: "reunion_apoderado",
  columns: {
    REUNION_ID: {
      type: "int",
      primary: true,
    },
    APODERADO_ID: {
      type: "int",
      primary: true,
    },
    CONFIRMA_ASISTENCIA: {
      type: "boolean",
      default: false,
    },
  },
  relations: {
    REUNION: {
      target: "Reunion",
      type: "many-to-one",
      joinColumn: {
        name: "REUNION_ID",
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

export default ReunionApoderadoSchema;
