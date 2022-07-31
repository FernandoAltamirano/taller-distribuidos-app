import { Button, Divider, Grid } from "@mui/material";

export const RequestDetailsInfo = ({ data, handleExecuteAction, loading }) => {
  return (
    <div
      className="layout-page modal-container request-details-info-modal"
      style={{ width: "40%", background: "white" }}
    >
      <h2>Datos de usuario</h2>
      <Grid container spacing={2} className="grid-container-request-details">
        <Grid item xs={6}>
          <p>
            <strong> Nombres:</strong> {data.user.firstname}
          </p>
        </Grid>
        <Grid item xs={6}>
          <p>
            <strong>Apellidos:</strong> {data.user.lastname}
          </p>
        </Grid>
        <Grid item xs={6}>
          <p>
            <strong>Correo electrónico:</strong> {data.user.email}
          </p>
        </Grid>
        <Grid item xs={6}>
          <p>
            <strong>Dirección:</strong> {data.address}
          </p>
        </Grid>
        <Grid item xs={6}>
          <p>
            <strong>Teléfono:</strong> {data.phone}
          </p>
        </Grid>
        <Grid item xs={6}>
          <p>
            <strong>País:</strong> {data.country}
          </p>
        </Grid>
      </Grid>
      <Divider />
      <h2>Datos de solicitud</h2>
      <Grid container spacing={2} className="grid-container-request-details">
        <Grid item xs={6}>
          <p>
            <strong>ID:</strong> {data.id}
          </p>
        </Grid>
        <Grid item xs={6}>
          <p>
            <strong>Fecha de aplicación:</strong> {data.application_date}
          </p>
        </Grid>
        <Grid item xs={6}>
          <p>
            <strong>Estado:</strong> {data.status}
          </p>
        </Grid>
      </Grid>
      <div className="btn-container-pets-page">
        <Button
          disabled={loading}
          onClick={() => handleExecuteAction("Aceptado")}
          className="btn-base"
          variant="contained"
          style={{ marginRight: "20px" }}
        >
          Aceptar
        </Button>
        <Button
          disabled={loading}
          onClick={() => handleExecuteAction("Rechazado")}
          className="btn-base-outlined"
          variant="outlined"
        >
          Rechazar
        </Button>
      </div>
    </div>
  );
};
