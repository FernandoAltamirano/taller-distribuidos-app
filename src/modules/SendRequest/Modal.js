import { Modal } from "../../components";
import { FormContainer } from "./FormContainer";
import { useSelector } from "react-redux";
import { LoginContainer } from "../Login/LoginContainer";

export const SendRequestModal = ({ data, open, setShowModal }) => {
  const state = useSelector((state) => state.User);
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal open={open} handleClose={handleClose}>
      {state.user ? (
        <FormContainer data={data} handleClose={handleClose} />
      ) : (
        <div className="layout-page modal-container login-modal">
          <LoginContainer isModal={true} handleClose={handleClose} />
        </div>
      )}
    </Modal>
  );
};
