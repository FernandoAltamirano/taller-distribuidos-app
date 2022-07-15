import { Button, Divider, Grid } from "@mui/material";

export const RequestDetailsInfo = ({ data,handleExecuteAction,loading }) => {
  return (
    <div className="layout-page modal-container" style={{width:"60%",background:"white"}}>
      <h1>Datos de usuario</h1>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <p>Nombres: {data.user.firstname}</p>
        </Grid>
        <Grid item xs={6}>
          <p>Apellidos: {data.user.lastname}</p>
        </Grid>
        <Grid item xs={6}>
          <p>Correo electrónico: {data.user.email}</p>
        </Grid>
        <Grid item xs={6}>
          <p>Dirección: {data.address}</p>
        </Grid>
        <Grid item xs={6}>
          <p>Teléfono: {data.phone}</p>
        </Grid>
        <Grid item xs={6}>
          <p>País: {data.country}</p>
        </Grid>
      </Grid>
      <Divider/>
      <h1>Datos de solicitud</h1>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <p>ID: {data.id}</p>
        </Grid>
        <Grid item xs={6}>
          <p>Fecha de aplicación: {data.application_date}</p>
        </Grid>
        <Grid item xs={6}>
          <p>Estado: {data.status}</p>
        </Grid>
      </Grid>
      <div>
        <Button
        disabled={loading}
        onClick={() => handleExecuteAction("Aceptado")}
        className="btn-base"
        variant="contained"
        >
          Aceptar
        </Button>
        <Button
          disabled={loading}
          onClick={() => handleExecuteAction("Aceptado")}
          className="btn-base-outlined"
          variant="outlined"
        >
          Rechazar
        </Button>
      </div>
    </div>
  );
};
