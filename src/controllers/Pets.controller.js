import { toast } from "../helpers";

const url = "https://taller-distr.herokuapp.com";
export class PetsController {
  static getAllPets = async ({ setLoading, setPets }) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/pets`);
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
      const objetcWithNumberType = { ...data, age: Number(data.age) };
      const response = await fetch(`${url}/pets/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYWUyNGYzMDc2NDJlOTVjZDJkZmZlZSIsImVtYWlsIjoiYWxiZXJndWVAZ21haWwuY29tIiwiaWF0IjoxNjU1NTgwMzk2LCJleHAiOjE2NTYxODUxOTZ9.i550RvCTaMbMdzbHMmQcn55LwOpMBQLvIMc1Z8w7Zlk",
        },
        body: JSON.stringify(objetcWithNumberType),
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
}
