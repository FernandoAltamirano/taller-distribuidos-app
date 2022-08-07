import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Loader, Table } from "../../components";
import { TextField, Button } from "@mui/material";
import { PetsController } from "../../controllers/Pets.controller";
import { DeletePetModal, UpdateForm } from "../../modules";
import ReplayIcon from "@mui/icons-material/Replay";
import AddIcon from "@mui/icons-material/Add";

export const Pets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(null);
  const [selectedPetData, setSelectedPetData] = useState(null);
  const filterRef = useRef("");

  const getAllPets = () =>
    PetsController.getPetsByInstitutionId({ setLoading, setPets });

  const handleModalToUpdate = (id) => {
    selectPet(id);
    setAction("UPDATE");
  };

  const handleModalToDelete = (id) => {
    selectPet(id);
    setAction("DELETE");
  };

  const handleSetAction = () => setAction(null);

  const handleReloadData = () => getAllPets();

  const handleDeletePet = async () => {
    await PetsController.deletePet({ setLoading, id: selectedPetData.id });
    await getAllPets();
    handleSetAction();
  };

  const handleSearchByFilter = () => {
    const filterValue = filterRef.current.value;
    if (filterValue !== "") {
      const filteredPets = pets.filter((pet) => pet.name === filterValue);
      setPets(filteredPets);
    }
  };

  const handleResetFilter = () => {
    filterRef.current.value = "";
    getAllPets();
  };

  const selectPet = (id) => {
    const petDataById = pets.find((pet) => pet.id === id);
    setSelectedPetData(petDataById);
  };

  const tableSlots = [
    {
      tag: "code",
      title: "Código",
    },
    {
      tag: "name",
      title: "Nombre",
    },
    {
      tag: "size",
      title: "Tamaño",
    },
    {
      tag: "activity",
      title: "Nivel de actividad",
    },
    {
      tag: "gender",
      title: "Género",
    },
    {
      tag: "",
      title: "Opciones",
      cell: (data) => (
        <div className='actions-container'>
          <span onClick={() => handleModalToUpdate(data.id)}>Editar</span>
          <span onClick={() => handleModalToDelete(data.id)}>Eliminar</span>
          <span></span>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllPets();
  }, []);

  return (
    <>
      <div className='layout-page'>
        <h1>Mascotas</h1>
        <div>
          <Link className='add-pet-button' to='/dashboard/mascotas/registrar'>
            <AddIcon />
            <span>Añadir nueva mascota</span>
          </Link>

          <div className='pets-table-container'>
            <div className='flex reset-button-container'>
              <ReplayIcon onClick={handleReloadData} />
            </div>
            <div className='flex filters-container'>
              <div className='filters-container-input'>
                <TextField
                  inputRef={filterRef}
                  label='Buscar por código de mascota'
                  variant='outlined'
                  type='search'
                />
              </div>
              <div className='flex' style={{ columnGap: "10px" }}>
                <Button
                  onClick={handleSearchByFilter}
                  className='btn-base'
                  variant='contained'
                >
                  Filtrar
                </Button>
                <Button
                  onClick={handleResetFilter}
                  className='btn-base-outlined'
                  variant='outlined'
                >
                  Resetear
                </Button>
              </div>
            </div>
            <div className='table-container-scroll'>
              {!loading ? <Table slots={tableSlots} data={pets} /> : <Loader />}
            </div>
          </div>
        </div>
      </div>
      <UpdateForm
        getAllPets={getAllPets}
        data={selectedPetData}
        deleteData={handleSetAction}
        id={action === "UPDATE" ? selectedPetData?.id : null}
      />
      <DeletePetModal
        deleteData={handleSetAction}
        handleDeletePet={handleDeletePet}
        id={action === "DELETE" ? selectedPetData?.id : null}
      />
    </>
  );
};
