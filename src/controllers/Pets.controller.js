import { toast } from "../helpers";

const url = "https://taller-distr.herokuapp.com";
export class PetsController {
  static getAllPets = async ({ setLoading, setPets }) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/pets`);
      const pets = await response.json();
      setPets(pets);
    } catch (err) {
      toast("warn", "No se pudo cargar las mascotas");
    } finally {
      setLoading(false);
    }
  };
}
