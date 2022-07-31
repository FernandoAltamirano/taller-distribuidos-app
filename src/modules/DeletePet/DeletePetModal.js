import { useEffect, useState } from "react";
import isEmpty from "is-empty";
import { Modal } from "../../components";
import { Button } from "@mui/material";

export const DeletePetModal = ({ deleteData, handleDeletePet, id }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    deleteData();
  };

  useEffect(() => {
    if (!isEmpty(id)) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [id]);

  return (
    <Modal open={open} handleClose={handleClose}>
      <div className="modal-container modal-delete-container">
        <strong>¿Esta seguro que quiere eliminar la mascota?</strong>
        <div className="btn-container-pets-page">
          <Button
            onClick={handleDeletePet}
            className="btn-base"
            variant="contained"
          >
            Eliminar
          </Button>
          <Button onClick={handleClose} className="btn-base-outlined">
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
};
