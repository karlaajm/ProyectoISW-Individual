import Table from "@components/Table";
import useAnotaciones from "@hooks/anotaciones/useGetAnotaciones.jsx";
import Search from "../components/Search";
import PopupAnotacion from "../components/PopupAnotacion";
import DeleteIcon from "../assets/deleteIcon.svg";
import UpdateIcon from "../assets/updateIcon.svg";
// import AddIcon from "../assets/addIcon.svg";
import UpdateIconDisable from "../assets/updateIconDisabled.svg";
import DeleteIconDisable from "../assets/deleteIconDisabled.svg";
import { useCallback, useState } from "react";
import "@styles/users.css";
import useEditAnotacion from "@hooks/anotaciones/useEditAnotacion";
// import useAddAnotacion from "@hooks/anotaciones/useAddAnotacion";
import useDeleteAnotacion from "@hooks/anotaciones/useDeleteAnotacion";

const Anotaciones = () => {
  const { anotaciones, fetchAnotaciones, setAnotaciones } = useAnotaciones();
  const [filterRut, setFilterRut] = useState("");

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataAnotacion,
    setDataAnotacion,
  } = useEditAnotacion(fetchAnotaciones, setAnotaciones);

  // const { handleClickAdd, handleAdd } = useAddAnotacion(setAnotaciones);

  const { handleDelete } = useDeleteAnotacion(
    fetchAnotaciones,
    setDataAnotacion
  );

  const handleRutFilterChange = (e) => {
    setFilterRut(e.target.value);
  };

  const handleSelectionChange = useCallback(
    (selectedAnotaciones) => {
      setDataAnotacion(selectedAnotaciones);
    },
    [setDataAnotacion]
  );

  const columns = [
    {
      title: "Estudiante",
      field: "NOMBRE_COMPLETO_ESTUDIANTE",
      width: 200,
      responsive: 0,
    },
    {
      title: "Asignatura",
      field: "NOMBRE_ASIGNATURA",
      width: 200,
      responsive: 3,
    },
    { title: "Tipo", field: "TIPO", width: 150, responsive: 2 },
    { title: "Descripción", field: "DESCRIPCION", width: 450, responsive: 2 },
    { title: "Fecha", field: "FECHA", width: 150, responsive: 2 },
  ];

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Anotaciones</h1>
          <div className="filter-actions">
            <Search
              value={filterRut}
              onChange={handleRutFilterChange}
              placeholder={"Filtrar por estudiante"}
            />
            {/* <button onClick={handleClickAdd}>
              <img src={AddIcon} alt="add" />
            </button> */}
            <button
              onClick={handleClickUpdate}
              disabled={dataAnotacion?.length === 0}
            >
              {dataAnotacion?.length === 0 ? (
                <img src={UpdateIconDisable} alt="edit-disabled" />
              ) : (
                <img src={UpdateIcon} alt="edit" />
              )}
            </button>
            <button
              className="delete-user-button"
              disabled={dataAnotacion?.length === 0}
              onClick={() => handleDelete(dataAnotacion)}
            >
              {dataAnotacion?.length === 0 ? (
                <img src={DeleteIconDisable} alt="delete-disabled" />
              ) : (
                <img src={DeleteIcon} alt="delete" />
              )}
            </button>
          </div>
        </div>
        <Table
          data={anotaciones}
          columns={columns}
          filter={filterRut}
          dataToFilter={"rut"}
          initialSortName={"nombreCompleto"}
          onSelectionChange={handleSelectionChange}
        />
      </div>
      <PopupAnotacion
        show={isPopupOpen}
        setShow={setIsPopupOpen}
        data={dataAnotacion}
        action={handleUpdate}
      />
    </div>
  );
};

export default Anotaciones;
