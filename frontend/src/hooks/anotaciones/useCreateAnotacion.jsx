import { useState } from "react";
import { crearAnotacion } from "@services/anotaciones.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";

const useCreateAnotacion = (fetchAnotaciones) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    TIPO: "POSITIVA",
    DESCRIPCION: "",
    FECHA: "",
    INSCRIPCION_ID: "",
    CLASE_ASIGNATURA_ID: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await crearAnotacion(formData);

      if (response?.status === "error") {
        return showErrorAlert(
          "Error al crear la anotación",
          response.message
        );
      }

      showSuccessAlert(
        "¡Creado!",
        "La anotación se ha creado correctamente."
      );
      setIsPopupOpen(false);
      setFormData({
        TIPO: "POSITIVA",
        DESCRIPCION: "",
        FECHA: "",
        INSCRIPCION_ID: "",
        CLASE_ASIGNATURA_ID: "",
      });
      await fetchAnotaciones();
    } catch (error) {
      console.error("Error al crear la anotación:", error);
      showErrorAlert(
        "Error",
        "Ocurrió un error al intentar crear la anotación."
      );
    }
  };

  return {
    isPopupOpen,
    setIsPopupOpen,
    formData,
    handleChange,
    handleSubmit,
  };
};

export default useCreateAnotacion;
