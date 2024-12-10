"use strict";
import { EntitySchema } from "typeorm";

const ReunionSchema = new EntitySchema({
  name: "Reunion",
  tableName: "reuniones",
  columns: {
    REUNION_ID: {
      type: "int",
      primary: true,
      generated: true,
    },
    TEMA: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    RESUMEN: {
      type: "text",
      nullable: false,
    },
    FECHA: {
      type: "timestamp with time zone",
      nullable: false,
    },
    ENVIAR_RECORDATORIO_1_DIA: {
      type: "boolean",
      default: false,
    },
    ENVIAR_RECORDATORIO_1_SEMANA: {
      type: "boolean",
      default: false,
    },
  },
});

export default ReunionSchema;
