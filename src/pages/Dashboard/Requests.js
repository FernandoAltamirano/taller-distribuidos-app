import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Loader, Table } from "../../components";
import { TextField, Button, MenuItem, Menu } from "@mui/material";
import { DeletePetModal, UpdateForm } from "../../modules";
import ReplayIcon from "@mui/icons-material/Replay";
import RequestsController from "../../controllers/Requests.controller";
import { RequestDetails } from "../../modules/AcceptRejectRequest";

export const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRequestData, setSelectedRequestData] = useState(null);
  const filterRef = useRef("");

  const getAllRequests = () =>
    RequestsController.getAllRequests({
      setLoading,
      setRequests,
      setFilteredRequests,
    });

  const handleDeleteData = () => {
    setSelectedRequestData(null);
  };
  const handleReloadData = () => getAllRequests();

  const handleResetFilter = () => {
    filterRef.current.value = "";
    getAllRequests();
  };

  const handleSearchByFilter = () => {
    const filterValue = filterRef.current.value;
    if (filterValue !== "") {
      const filteredRequests = requests.filter((request) =>
        request.user.email.toLowerCase().includes(filterValue.toLowerCase())
      );
      setFilteredRequests(filteredRequests);
    } else {
      setFilteredRequests(requests);
    }
  };

  const selectRequest = (data) => {
    const requestDataById = requests.find((request) => request.id === data.id);
    setSelectedRequestData(requestDataById);
  };

  const tableSlots = [
    {
      tag: "application_date",
      title: "Fecha de aplicación",
    },
    {
      tag: "",
      title: "Nombre de solicitante",
      cell: (data) => <p>{data.user.firstname}</p>,
    },
    {
      tag: "",
      title: "Email de solicitante",
      cell: (data) => <p>{data.user.email}</p>,
    },
    {
      tag: "address",
      title: "Dirección",
    },
    {
      tag: "phone",
      title: "Teléfono",
    },
    {
      tag: "status",
      title: "Estado",
    },
  ];

  useEffect(() => {
    getAllRequests();
  }, []);

  return (
    <>
      <div className="layout-page">
        <h1>Solicitudes</h1>
        <div>
          <div className="pets-table-container">
            <div className="flex reset-button-container">
              <ReplayIcon onClick={handleReloadData} />
            </div>
            <div className="flex filters-container">
              <div className="filters-container-input">
                <TextField
                  inputRef={filterRef}
                  label="Buscar por email de usuario"
                  variant="outlined"
                  type="search"
                />
              </div>
              <div className="flex" style={{ columnGap: "10px" }}>
                <Button
                  onClick={handleSearchByFilter}
                  className="btn-base"
                  variant="contained"
                >
                  Filtrar
                </Button>
                <Button
                  onClick={handleResetFilter}
                  className="btn-base-outlined"
                  variant="outlined"
                >
                  Resetear
                </Button>
              </div>
            </div>
            <div className="table-container-scroll">
              {!loading ? (
                <Table
                  slots={tableSlots}
                  data={filteredRequests}
                  actionRow={selectRequest}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
      <RequestDetails
        data={selectedRequestData}
        deleteData={handleDeleteData}
        getAllRequests={getAllRequests}
      />
    </>
  );
};
