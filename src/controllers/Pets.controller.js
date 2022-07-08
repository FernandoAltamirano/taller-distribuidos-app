import { BASE_URL } from "../constants/baseUrl";
import { toast } from "../helpers";

export class PetsController {
  static getAllPets = async ({ setLoading, setPets }) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/pets`);
      const pets = await response.json();
      setPets(pets.reverse());
    } catch (err) {
      toast("warn", "No se pudo cargar las mascotas");
    } finally {
      setLoading(false);
    }
  };
  static registerNewPet = async ({ data, setLoading }) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/pets/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      const jsonResponse = await response.json();
      if (jsonResponse.id) {
        toast("success", "Registro exitoso");
        return true;
      }
    } catch (err) {
      toast("warn", "No se pudo registrar las mascotas");
      return false;
    } finally {
      setLoading(false);
    }
  };
  static updatePet = async ({ data, setLoading, id }) => {
    const { institution, ...rest } = data;
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/pets/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(rest),
      });
      const jsonResponse = await response.json();
      if (jsonResponse.id) {
        toast("success", "Actualización exitosa");
        return true;
      }
    } catch (err) {
      toast("warn", "No se pudo actualizar la información");
      return false;
    } finally {
      setLoading(false);
    }
  };
  static deletePet = async ({ setLoading, id }) => {
    setLoading(true);
    try {
      await fetch(`${BASE_URL}/pets/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast("success", "Eliminación exitosa");
      return true;
    } catch (err) {
      console.log({ err });
      toast("warn", "No se pudo borrar la información");
      return false;
    } finally {
      setLoading(false);
    }
  };
}
