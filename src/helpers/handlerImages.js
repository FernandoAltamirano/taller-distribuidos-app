import { storage } from "../firebase";
export const chargePreviewImage = (e, setPreviewImage) => {
  e.preventDefault();
  const image = e.target.files[0];
  if (
    image.type === "image/png" ||
    image.type === "image/jpeg" ||
    image.type === "image/jpg"
  ) {
    const file = new FileReader();
    file.readAsDataURL(image);
    file.onload = (ev) => {
      setPreviewImage({ name: image.name, data: ev.target.result });
    };
  }
};

export const uploadImage = ({ file, executeSendData, directory }) => {
  const stg = storage.ref(`/${directory}` + file.name);
  const task = stg.put(file);
  return task.on(
    "state_changed",
    function () {},
    function () {},
    function () {
      task.snapshot.ref.getDownloadURL().then((url) => {
        executeSendData(url);
      });
    }
  );
};
