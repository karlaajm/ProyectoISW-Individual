"use strict";
import Usuario from "../entity/usuario.entity.js";
import Profesor from "../entity/profesor.entity.js";
import Asignatura from "../entity/asignatura.entity.js";
import ProfesorAsignatura from "../entity/profesorAsignatura.entity.js";
import Curso from "../entity/curso.entity.js";
import Clase from "../entity/clase.entity.js";
import ClaseAsignatura from "../entity/claseAsignatura.entity.js";
import Estudiante from "../entity/estudiante.entity.js";
import Inscripcion from "../entity/inscripcion.entity.js";
import Apoderado from "../entity/apoderado.entity.js";
import EstudianteApoderado from "../entity/estudianteApoderado.entity.js";
import { AppDataSource } from "./configDb.js";
import { encryptPassword } from "../helpers/bcrypt.helper.js";

async function createUsers() {
  try {
    const userRepository = AppDataSource.getRepository(Usuario);

    const count = await userRepository.count();
    if (count > 0) return;

    await userRepository.save(
      userRepository.create({
        RUT: "20.255.623-K",
        NOMBRE: "Karla",
        APELLIDO_PATERNO: "Jiménez",
        APELLIDO_MATERNO: "Millar",
        CORREO: "admin@gmail.com",
        CONTRASENIA: await encryptPassword("admin1234"),
        TIPO_USUARIO: "ADMINISTRADOR",
      }),
    );
    await userRepository.save(
      userRepository.create({
        RUT: "24.340.475-4",
        NOMBRE: "Juan",
        APELLIDO_PATERNO: "Pérez",
        APELLIDO_MATERNO: "González",
        CORREO: "juan.perez@gmail.com",
        CONTRASENIA: await encryptPassword("user1234"),
        TIPO_USUARIO: "ESTUDIANTE",
      }),
    );
    await userRepository.save(
      userRepository.create({
        RUT: "13.039.761-1",
        NOMBRE: "Ana",
        APELLIDO_PATERNO: "Martínez",
        APELLIDO_MATERNO: "Torres",
        CORREO: "ana.martinez@gmail.com",
        CONTRASENIA: await encryptPassword("user1234"),
        TIPO_USUARIO: "PROFESOR",
      }),
    );
    await userRepository.save(
      userRepository.create({
        RUT: "24.626.103-2",
        NOMBRE: "María",
        APELLIDO_PATERNO: "López",
        APELLIDO_MATERNO: "Ramírez",
        CORREO: "maria.lopez@gmail.com",
        CONTRASENIA: await encryptPassword("user1234"),
        TIPO_USUARIO: "ESTUDIANTE",
      }),
    );
    await userRepository.save(
      userRepository.create({
        RUT: "10.343.890-k",
        NOMBRE: "Carlos",
        APELLIDO_PATERNO: "Silva",
        APELLIDO_MATERNO: "Soto",
        CORREO: "carlos.silva@gmail.com",
        CONTRASENIA: await encryptPassword("user1234"),
        TIPO_USUARIO: "PROFESOR",
      }),
    );
    await userRepository.save(
      userRepository.create({
        RUT: "21.649.522-5",
        NOMBRE: "Valentina",
        APELLIDO_PATERNO: "Salas",
        APELLIDO_MATERNO: "Andrade",
        CORREO: "valentina.salas@gmail.com",
        CONTRASENIA: await encryptPassword("user1234"),
        TIPO_USUARIO: "ESTUDIANTE",
      }),
    );
    await userRepository.save(
      userRepository.create({
        RUT: "22.018.486-2",
        NOMBRE: "Leonardo",
        APELLIDO_PATERNO: "Bernal",
        APELLIDO_MATERNO: "Pacheco",
        CORREO: "leonardo.bernal@gmail.com",
        CONTRASENIA: await encryptPassword("user1234"),
        TIPO_USUARIO: "ESTUDIANTE",
      }),
    );

    console.log("* => Usuarios creados exitosamente");
  } catch (error) {
    console.error("Error al crear usuarios:", error);
  }
}

async function initData() {
  try {
    const profesorRepository = AppDataSource.getRepository(Profesor);
    const asignaturaRepository = AppDataSource.getRepository(Asignatura);
    const profesorAsignaturaRepository =
      AppDataSource.getRepository(ProfesorAsignatura);
    const cursoRepository = AppDataSource.getRepository(Curso);
    const claseRepository = AppDataSource.getRepository(Clase);
    const claseAsignaturaRepository =
      AppDataSource.getRepository(ClaseAsignatura);
    const estudianteRepository = AppDataSource.getRepository(Estudiante);
    const inscripcionRepository = AppDataSource.getRepository(Inscripcion);
    const apoderadoRepository = AppDataSource.getRepository(Apoderado);
    const estudianteApoderadoRepository =
      AppDataSource.getRepository(EstudianteApoderado);

    const count = await asignaturaRepository.count();
    if (count > 0) return;

    await profesorRepository.save(
      profesorRepository.create({
        USUARIO_ID: 3, // Ana Martínez Torres
      }),
    );
    await profesorRepository.save(
      profesorRepository.create({
        USUARIO_ID: 5, // Carlos Silva Soto
      }),
    );

    await asignaturaRepository.save(
      asignaturaRepository.create({
        NOMBRE: "Artes Visuales",
      }),
    );
    await asignaturaRepository.save(
      asignaturaRepository.create({
        NOMBRE: "Matemáticas",
      }),
    );

    await profesorAsignaturaRepository.save(
      profesorAsignaturaRepository.create({
        PROFESOR_ID: 1, // Ana Martínez Torres
        ASIGNATURA_ID: 1, // Artes Visuales
      }),
    );
    await profesorAsignaturaRepository.save(
      profesorAsignaturaRepository.create({
        PROFESOR_ID: 2, // Carlos Silva Soto
        ASIGNATURA_ID: 2, // Matemáticas
      }),
    );

    await cursoRepository.save(
      cursoRepository.create({
        NOMBRE: "5to básico",
      }),
    );
    await cursoRepository.save(
      cursoRepository.create({
        NOMBRE: "1ro medio",
      }),
    );

    await claseRepository.save(
      claseRepository.create({
        CURSO_ID: 1,
        NOMBRE: "5to C",
        PERIODO_ACADEMICO: "2024-2",
      }),
    );
    await claseRepository.save(
      claseRepository.create({
        CURSO_ID: 2,
        NOMBRE: "1ro Medio A",
        PERIODO_ACADEMICO: "2024-2",
      }),
    );

    await claseAsignaturaRepository.save(
      claseAsignaturaRepository.create({
        CLASE_ID: 1, // 5to C
        ASIGNATURA_ID: 1, // Artes Visuales
        PROFESOR_ID: 1, // Ana Martínez Torres
      }),
    );
    await claseAsignaturaRepository.save(
      claseAsignaturaRepository.create({
        CLASE_ID: 2, // 1ro Medio A
        ASIGNATURA_ID: 2, // Matemáticas
        PROFESOR_ID: 2, // Carlos Silva Soto
      }),
    );

    await estudianteRepository.save(
      estudianteRepository.create({
        USUARIO_ID: 2, // María López Ramírez
      }),
    );
    await estudianteRepository.save(
      estudianteRepository.create({
        USUARIO_ID: 4, // Juan Pérez González
      }),
    );
    await estudianteRepository.save(
      estudianteRepository.create({
        USUARIO_ID: 6, // Valentina Salas Andrade
      }),
    );
    await estudianteRepository.save(
      estudianteRepository.create({
        USUARIO_ID: 7, // Leonardo Bernal Pacheco
      }),
    );

    await inscripcionRepository.save(
      inscripcionRepository.create({
        ESTUDIANTE_ID: 1, // María López Ramírez
        CLASE_ID: 1,
        PROMEDIO_GLOBAL: 6.7,
      }),
    );
    await inscripcionRepository.save(
      inscripcionRepository.create({
        ESTUDIANTE_ID: 2, // Juan Pérez González
        CLASE_ID: 1,
        PROMEDIO_GLOBAL: 5.52,
      }),
    );
    await inscripcionRepository.save(
      inscripcionRepository.create({
        ESTUDIANTE_ID: 3, // Valentina Salas Andrade
        CLASE_ID: 2,
        PROMEDIO_GLOBAL: 4.6,
      }),
    );
    await inscripcionRepository.save(
      inscripcionRepository.create({
        ESTUDIANTE_ID: 4, // Leonardo Bernal Pacheco
        CLASE_ID: 2,
        PROMEDIO_GLOBAL: 6,
      }),
    );

    await apoderadoRepository.save(
      apoderadoRepository.create({
        NOMBRE: "Fernanda",
        APELLIDO_PATERNO: "González",
        APELLIDO_MATERNO: "Rojas",
        CORREO: "fernanda.gonzales@gmail.com",
        CELULAR: "+56993857622",
        ES_PRINCIPAL: true,
        ACTIVO: true,
      }),
    );
    await apoderadoRepository.save(
      apoderadoRepository.create({
        NOMBRE: "Juan",
        APELLIDO_PATERNO: "Martínez",
        APELLIDO_MATERNO: "Soto",
        CORREO: "juan.martinez@gmail.com",
        CELULAR: "+56955237894",
        ES_PRINCIPAL: true,
        ACTIVO: true,
      }),
    );
    await apoderadoRepository.save(
      apoderadoRepository.create({
        NOMBRE: "Camila",
        APELLIDO_PATERNO: "Pérez",
        APELLIDO_MATERNO: "Muñoz",
        CORREO: "camila.perez@gmail.com",
        CELULAR: "+56900628109",
        ES_PRINCIPAL: true,
        ACTIVO: true,
      }),
    );
    await apoderadoRepository.save(
      apoderadoRepository.create({
        NOMBRE: "Cristóbal",
        APELLIDO_PATERNO: "Rivera",
        APELLIDO_MATERNO: "Morales",
        CORREO: "cristobal.rivera@gmail.com",
        CELULAR: "+56951022831",
        ES_PRINCIPAL: true,
        ACTIVO: true,
      }),
    );

    await estudianteApoderadoRepository.save(
      estudianteApoderadoRepository.create({
        ESTUDIANTE_ID: 1,
        APODERADO_ID: 1,
      }),
    );
    await estudianteApoderadoRepository.save(
      estudianteApoderadoRepository.create({
        ESTUDIANTE_ID: 2,
        APODERADO_ID: 2,
      }),
    );
    await estudianteApoderadoRepository.save(
      estudianteApoderadoRepository.create({
        ESTUDIANTE_ID: 3,
        APODERADO_ID: 3,
      }),
    );
    await estudianteApoderadoRepository.save(
      estudianteApoderadoRepository.create({
        ESTUDIANTE_ID: 4,
        APODERADO_ID: 4,
      }),
    );

    console.log("* => Data inicializada exitosamente");
  } catch (error) {
    console.error("Error al inicializar data:", error);
  }
}

export { createUsers, initData };
