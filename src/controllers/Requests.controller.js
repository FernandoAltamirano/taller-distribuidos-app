import { BASE_URL } from "../constants/baseUrl";
import { toast } from "../helpers";

export default class RequestsController {
  static getAllRequests = async ({ setLoading, setRequests,setFilteredRequests }) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/request`);
      const requests = await response.json();
      setRequests(requests)
      setFilteredRequests(requests)
    } catch (err) {
      toast("warn", "No se pudo cargar las solicitudes");
    } finally {
      setLoading(false);
    }
  };
  static handleStatusRequest = async ({ setLoading,type,id }) => {
    setLoading(true);
    try {
      const data = {
        status:type,
        check_date: new Date().toISOString().split("T")[0].split("-").reverse().join("-")
      }
      
      const requestConfig = {
        "method":"POST",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data)
      }
      const response = await fetch(`${BASE_URL}/request/${id}/check`,requestConfig);
      const res = await response.json()
    } catch (err) {
      toast("warn", "No se pudo ejecutar las accion sobre la solicitud");
    } finally {
      setLoading(false);
    }
  };
 
}
