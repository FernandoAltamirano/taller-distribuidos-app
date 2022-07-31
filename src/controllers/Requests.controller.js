import isEmpty from "is-empty";
import { BASE_URL } from "../constants/baseUrl";
import { toast } from "../helpers";
import { formatDateNumbersNow } from "../helpers/handlerDate";

export default class RequestsController {
  static getAllRequests = async ({
    setLoading,
    setRequests,
    setFilteredRequests,
  }) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/request`);
      const requests = await response.json();
      setRequests(requests.reverse());
      setFilteredRequests(requests);
    } catch (err) {
      toast("warn", "No se pudo cargar las solicitudes");
    } finally {
      setLoading(false);
    }
  };

  static handleStatusRequest = async ({ setLoading, type, id }) => {
    setLoading(true);
    try {
      const data = {
        status: type,
        check_date: formatDateNumbersNow(),
      };

      const requestConfig = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(
        `${BASE_URL}/request/${id}/check`,
        requestConfig
      );
      const res = await response.json();
      if (!isEmpty(res.request.id)) {
        toast("success", res.message);
        return true;
      }
      return false;
    } catch (err) {
      toast("warn", "No se pudo ejecutar las accion sobre la solicitud");
      return false;
    } finally {
      setLoading(false);
    }
  };

  static sendNewRequest = async ({ setLoading, id, petData }) => {
    setLoading(true);
    try {
      const requestConfig = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(petData),
      };
      const response = await fetch(
        `${BASE_URL}/pets/${id}/send-request`,
        requestConfig
      );
      const data = await response.json();
      if (!isEmpty(data.id)) {
        toast("success", "Envío de solicitud exitoso.");
        return true;
      }
      toast("warn", "No se pudo enviar la solicitud");
      return false;
    } catch (err) {
      toast("warn", "No se pudo enviar la solicitud");
      return false;
    } finally {
      setLoading(false);
    }
  };
}
