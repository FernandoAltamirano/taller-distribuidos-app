import isEmpty from "is-empty";
import { useEffect, useState } from "react";
import { Modal } from "../../components";
import { FormContainer } from "./FormContainer";

export const UpdateForm = ({ data, deleteData, id, getAllPets }) => {
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
      <FormContainer
        getAllPets={getAllPets}
        data={data}
        deleteData={deleteData}
        id={id}
      />
    </Modal>
  );
};
