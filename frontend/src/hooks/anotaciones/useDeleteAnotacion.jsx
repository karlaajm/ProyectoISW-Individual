import { deleteAnotacion } from "@services/anotaciones.service.js";
import {
  deleteDataAlert,
  showErrorAlert,
  showSuccessAlert,
} from "@helpers/sweetAlert.js";

const useDeleteAnotacion = (fetchAnotaciones, setDataAnotacion) => {
  const handleDelete = async (dataAnotacion) => {
    if (dataAnotacion.length > 0) {
      try {
        const result = await deleteDataAlert();
        if (result.isConfirmed) {
          const response = await deleteAnotacion(dataAnotacion[0].ANOTACION_ID);
          if (response.status === "Client error") {
            return showErrorAlert("Error", response.details);
          }
          showSuccessAlert(
            "¡Eliminada!",
            "La anotación ha sido eliminada correctamente."
          );
          await fetchAnotaciones();
          setDataAnotacion([]);
        } else {
          showErrorAlert("Cancelado", "La operación ha sido cancelada.");
        }
      } catch (error) {
        console.error("Error al eliminar la anotación:", error);
        showErrorAlert(
          "Cancelado",
          "Ocurrió un error al eliminar la anotación."
        );
      }
    }
  };

  return {
    handleDelete,
  };
};

export default useDeleteAnotacion;
