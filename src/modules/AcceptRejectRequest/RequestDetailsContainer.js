import { Button } from "@mui/material";
import isEmpty from "is-empty";
import { useEffect, useState } from "react";
import { Modal } from "../../components";
import { RequestDetailsInfo } from "./RequestDetailsInfo";
import RequestsController from '../../controllers/Requests.controller'

export const RequestDetails = ({ data, deleteData, getAllPets }) => {
  const [loading,setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    deleteData();
  };
  useEffect(() => {
    if (!isEmpty(data?.id)) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [data?.id]);

  const handleExecuteAction = (type) => {
    RequestsController.handleStatusRequest({setLoading,id:data.id,type})
  }

  return (
    <Modal open={open} handleClose={handleClose}>
      <RequestDetailsInfo data={data} handleExecuteAction={handleExecuteAction} loading={loading} /> 
    </Modal>
  );
};
