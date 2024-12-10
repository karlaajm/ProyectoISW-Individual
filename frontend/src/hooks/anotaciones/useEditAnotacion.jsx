import { useState } from "react";
import { updateAnotacion } from "@services/anotaciones.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";

const useEditAnotacion = (fetchAnotaciones, setAnotaciones) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [dataAnotacion, setDataAnotacion] = useState([]);

  const handleClickUpdate = () => {
    if (dataAnotacion.length > 0) {
      setIsPopupOpen(true);
    }
  };

  const handleUpdate = async (updatedAnotacionData) => {
    if (updatedAnotacionData) {
      try {
        const updatedAnotacion = await updateAnotacion(
          updatedAnotacionData,
          dataAnotacion[0].ANOTACION_ID
        );
        if (updatedAnotacion?.status?.includes("error")) {
          return showErrorAlert(
            "Error al actualizar la anotación",
            updatedAnotacion.message
          );
        }

        await fetchAnotaciones();
        showSuccessAlert(
          "¡Actualizado!",
          "La anotación ha sido actualizada correctamente."
        );
        setIsPopupOpen(false);

        setAnotaciones((prevAnotaciones) =>
          prevAnotaciones.map((anotacion) => {
            return anotacion.ANOTACION_ID === updatedAnotacion.ANOTACION_ID
              ? updatedAnotacion
              : anotacion;
          })
        );

        setDataAnotacion([]);
      } catch (error) {
        console.error("Error al actualizar la anotación:", error);
        showErrorAlert(
          "Cancelado",
          "Ocurrió un error al actualizar la anotación."
        );
      }
    }
  };

  return {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataAnotacion,
    setDataAnotacion,
  };
};

export default useEditAnotacion;
