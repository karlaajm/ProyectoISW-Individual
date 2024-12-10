import axios from "./root.service.js";
import cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export async function login(dataUser) {
  try {
    const response = await axios.post("/auth/login", {
      email: dataUser.email,
      password: dataUser.password,
    });
    const { status, data } = response;
    if (status === 200) {
      const {
        NOMBRE,
        APELLIDO_PATERNO,
        APELLIDO_MATERNO,
        CORREO,
        RUT,
        TIPO_USUARIO,
      } = jwtDecode(data.data.token);
      const userData = {
        NOMBRE,
        APELLIDO_PATERNO,
        APELLIDO_MATERNO,
        CORREO,
        RUT,
        TIPO_USUARIO,
      };
      sessionStorage.setItem("usuario", JSON.stringify(userData));
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      cookies.set("jwt-auth", data.data.token, { path: "/" });
      return response.data;
    }
  } catch (error) {
    return error.response.data;
  }
}

export async function logout() {
  try {
    await axios.post("/auth/logout");
    sessionStorage.removeItem("usuario");
    cookies.remove("jwt");
    cookies.remove("jwt-auth");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
}
