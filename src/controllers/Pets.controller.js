import { toast } from '../helpers';

const url = 'http://localhost:3001';
export class PetsController {
  static getAllPets = async ({ setLoading, setPets }) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/pets`);
      const pets = await response.json();
      setPets(pets.reverse());
    } catch (err) {
      toast('warn', 'No se pudo cargar las mascotas');
    } finally {
      setLoading(false);
    }
  };
  static registerNewPet = async ({ data, setLoading }) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/pets/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYWUzYzI4MzE4NzhkMzhlMjM2NjA2YiIsImVtYWlsIjoiYWxiZXJndWVAZ21haWwuY29tIiwiaWF0IjoxNjU1NTg1ODM2LCJleHAiOjE2NTYxOTA2MzZ9.nDuK36lneOmI4-d_rfvClQIrLKFtgtX1W1mVHUfDUIs',
        },
        body: JSON.stringify(data),
      });
      const jsonResponse = await response.json();
      if (jsonResponse.id) {
        toast('success', 'Registro exitoso');
        return true;
      }
    } catch (err) {
      toast('warn', 'No se pudo registrar las mascotas');
      return false;
    } finally {
      setLoading(false);
    }
  };
}
