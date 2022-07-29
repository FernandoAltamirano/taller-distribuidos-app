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
  static getPetById = async ({ setLoading, setPet, id }) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/pets/${id}`);
      const pet = await response.json();
      setPet(pet);
    } catch (err) {
      toast("warn", "No se pudo cargar los datos de la mascota");
    } finally {
      setLoading(false);
    }
  };
  static registerNewPet = async ({ data, setLoading }) => {
    try {
      const requestConfig = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(`${BASE_URL}/pets/register`, requestConfig);
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
      toast("warn", "No se pudo borrar la información");
      return false;
    } finally {
      setLoading(false);
    }
  };
}
