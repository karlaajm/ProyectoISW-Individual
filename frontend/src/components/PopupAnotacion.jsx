import Form from "./Form";
import "@styles/popup.css";
import CloseIcon from "@assets/XIcon.svg";

export default function PopupAnotacion({
  show,
  setShow,
  dataAnotacion = {},
  action,
  mode = "create",
}) {
  const isEditing = mode === "edit";
  const title = isEditing ? "Editar Anotación" : "Crear Anotación";
  const buttonText = isEditing ? "Guardar Cambios" : "Crear";

  const handleSubmit = (formData) => {
    action({
      ...formData,
      FECHA: new Date().toISOString().split("T")[0],
      CLASE_ASIGNATURA_ID:
        dataAnotacion?.CLASE_ASIGNATURA_ID?.CLASE_ASIGNATURA_ID || "",
      INSCRIPCION_ID: dataAnotacion?.INSCRIPCION_ID?.INSCRIPCION_ID || "",
    });
  };

  return (
    <div>
      {show && (
        <div className="bg">
          <div className="popup">
            <button className="close" onClick={() => setShow(false)}>
              <img src={CloseIcon} alt="Cerrar" />
            </button>
            <Form
              title={title}
              fields={[
                {
                  label: "Estudiante",
                  name: "NOMBRE_COMPLETO_ESTUDIANTE",
                  defaultValue: dataAnotacion?.NOMBRE_COMPLETO_ESTUDIANTE || "",
                  placeholder: "Nombre del estudiante",
                  disabled: isEditing,
                  fieldType: "input",
                  type: "text",
                  minLength: 10,
                  maxLength: 90,
                  pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                  patternMessage: "Debe contener solo letras y espacios",
                },
                {
                  label: "Asignatura",
                  name: "NOMBRE_ASIGNATURA",
                  defaultValue: dataAnotacion?.NOMBRE_ASIGNATURA || "",
                  placeholder: "Nombre de la asignatura",
                  disabled: isEditing,
                  fieldType: "input",
                  type: "text",
                  minLength: 10,
                  maxLength: 90,
                  pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                  patternMessage: "Debe contener solo letras y espacios",
                },
                {
                  label: "Tipo",
                  name: "TIPO",
                  fieldType: "select",
                  options: [
                    { value: "POSITIVA", label: "Positiva" },
                    { value: "NEGATIVA", label: "Negativa" },
                    { value: "OBSERVACION", label: "Observación" },
                  ],
                  required: true,
                  defaultValue: dataAnotacion?.TIPO || "POSITIVA",
                },
                {
                  label: "Descripción",
                  name: "DESCRIPCION",
                  defaultValue: dataAnotacion?.DESCRIPCION || "",
                  placeholder: "Describa la anotación...",
                  fieldType: "input",
                  required: true,
                  minLength: 10,
                  maxLength: 255,
                },
              ]}
              onSubmit={handleSubmit}
              buttonText={buttonText}
              backgroundColor={"#fff"}
            />
          </div>
        </div>
      )}
    </div>
  );
}
