import axios from "./root.service.js";

export async function getAnotaciones() {
  try {
    const { data } = await axios.get("/anotaciones/");
    return data.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function deleteAnotacion(id_anotacion) {
  try {
    const response = await axios.delete(
      `/anotaciones/eliminar/?id=${id_anotacion}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function crearAnotacion(data) {
  try {
    const response = await axios.post(`/anotaciones/crear`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateAnotacion(data, id_anotacion) {
  try {
    const response = await axios.patch(
      `/anotaciones/actualizar/?id=${id_anotacion}`,
      data
    );
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}
