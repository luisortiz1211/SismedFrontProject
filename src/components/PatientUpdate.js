import AnnounTitle from "@/components/AnnounTitle";
import ChargeInformation from "@/components/ChargeInformation";
import Loading from "@/components/Loading";
import { Patients } from "src/api/patient";
import { fetcher } from "src/api/utils";
import { Fade } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@mui/icons-material/Save";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

const useStyles = makeStyles((theme) => ({
  root: {
    //height: "auto",
    //padding: "15px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: "40px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.secondary.main,
  },
  textField: {
    paddingBottom: "15px",
    color: "#414A4F",
  },

  formControl: {
    minWidth: 300,
    paddingBottom: "15px",
    color: "#414A4F",
    paddingRight: "10px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  mpaper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: theme.spacing(3),
  },
  rightIcon: {
    marginLeft: theme.spacing(2),
  },
}));

export default function PatientsInformation({ patientID }) {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;

  const { register, control, handleSubmit } = useForm();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (patient) => {
    try {
      await Patients.update(`${patientID}`, {
        //ci: patient.ci,
        name: patient.name,
        lastName: patient.lastName,
        //sex: patient.sex,
        //civilStatus: patient.civilStatus,
        //birthay: patient.birthay,
        employment: patient.employment,
        email: patient.email,
        movil: patient.movil,
        landline: patient.landline,
        address: patient.address,
        nationality: patient.nationality,
        city: patient.city,
        parish: patient.parish,
      });
    } catch (error) {
      if (error.response) {
        console.error(error.response);
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error("Error", error.message);
      }
      console.error(error.config);
    }
  };
  const { data, error } = useSWR(`/patients/${patientID}`, fetcher);
  console.log("información del paciente", data);

  if (error)
    return (
      <div>
        <ChargeInformation />
      </div>
    );
  if (!data)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <Container component={"span"} variant={"body2"}>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <AnnounTitle>
          Actualice los datos personales de ser necesario
        </AnnounTitle>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={2}
          style={{
            backgroundColor: "#BBF0E8",
            paddingBottom: "10px",
            paddingTop: "15px",
            color: "#092435",
          }}
        >
          {" "}
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="ci"
              name="ci"
              label="Cédula"
              defaultValue={data.ci}
              className={classes.textField}
              disabled
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              //{...register("ci")}
            />
          </Grid>
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="name"
              name="name"
              label="Nombre"
              defaultValue={data.name}
              className={classes.textField}
              required
              variant="outlined"
              {...register("name")}
            />
          </Grid>
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="lastName"
              name="lastName"
              label="Apellidos"
              defaultValue={data.lastName}
              required
              className={classes.textField}
              variant="outlined"
              {...register("lastName")}
            />
          </Grid>
        </Grid>{" "}
        <Divider
          light
          style={{ backgroundColor: "#60CCD9", color: "#092435" }}
        />
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={2}
          style={{
            backgroundColor: "#FFFFFF",
            paddingBottom: "10px",
            paddingTop: "15px",
            color: "#092435",
          }}
        >
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="sex"
              name="sex"
              label="Sexo"
              defaultValue={data.sex === 1 ? "Masculino" : "Femenino"}
              className={classes.textField}
              variant="outlined"
              disabled
              //{...register("sex")}
            />
          </Grid>
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="civilStatus"
              name="civilStatus"
              label="Estado civil"
              defaultValue={
                data.civilStatus === "1"
                  ? "Soltero"
                  : data.civilStatus === "2"
                  ? "Casado"
                  : data.civilStatus === "3"
                  ? "Divordiado"
                  : data.civilStatus === "4"
                  ? "Unión libre"
                  : "Montepio"
              }
              required
              className={classes.textField}
              variant="outlined"
              // {...register("civilStatus")}
            />
          </Grid>
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="birthay"
              name="birthay"
              label="Fecha nacimiento"
              defaultValue={data.birthay}
              //required
              disabled
              className={classes.textField}
              variant="outlined"
              //{...register("birthay")}
            />
          </Grid>
        </Grid>
        <Divider
          light
          style={{ backgroundColor: "#60CCD9", color: "#092435" }}
        />
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={2}
          style={{
            backgroundColor: "#BBF0E8",
            paddingBottom: "10px",
            paddingTop: "15px",
            color: "#092435",
          }}
        >
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="employment"
              name="employment"
              label="Ocupación"
              defaultValue={data.employment}
              required
              className={classes.textField}
              variant="outlined"
              {...register("employment")}
            />
          </Grid>
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="email"
              name="email"
              label="Correo electrónico"
              defaultValue={data.email}
              required
              className={classes.textField}
              variant="outlined"
              {...register("email")}
            />
          </Grid>
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="movil"
              name="movil"
              label="Celular"
              defaultValue={data.movil}
              required
              className={classes.textField}
              variant="outlined"
              {...register("movil")}
            />
          </Grid>
        </Grid>
        <Divider
          light
          style={{ backgroundColor: "#60CCD9", color: "#092435" }}
        />
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={2}
          style={{
            backgroundColor: "#FFFFFF",
            paddingBottom: "10px",
            paddingTop: "15px",
            color: "#092435",
          }}
        >
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="landline"
              name="landline"
              label="Telf. Fijo"
              defaultValue={data.landline}
              required
              className={classes.textField}
              variant="outlined"
              {...register("landline")}
            />
          </Grid>
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="address"
              name="address"
              label="Dirección"
              defaultValue={data.address}
              required
              className={classes.textField}
              variant="outlined"
              {...register("address")}
            />
          </Grid>
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="nationality"
              name="nationality"
              label="País/Origen"
              defaultValue={data.nationality}
              required
              className={classes.textField}
              variant="outlined"
              {...register("nationality")}
            />
          </Grid>
        </Grid>
        <Divider
          light
          style={{ backgroundColor: "#60CCD9", color: "#092435" }}
        />
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={2}
          style={{
            backgroundColor: "#BBF0E8",
            paddingBottom: "20px",
            paddingTop: "15px",
            color: "#092435",
          }}
        >
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="city"
              name="city"
              label="Ciudad"
              defaultValue={data.city}
              required
              className={classes.textField}
              variant="outlined"
              {...register("city")}
            />
          </Grid>
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="parish"
              name="parish"
              label="Provincia"
              defaultValue={data.parish}
              required
              className={classes.textField}
              variant="outlined"
              {...register("parish")}
            />
          </Grid>
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="patient_id"
              name="patient_id"
              label="# Historia clínica"
              defaultValue={data.patient_id}
              className={classes.textField}
              disabled
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              //{...register("patient_id")}
            />
          </Grid>
        </Grid>
        <Divider
          light
          style={{ backgroundColor: "#60CCD9", color: "#092435" }}
        />
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          style={{
            backgroundColor: "#FFFFFF",
            paddingBottom: "10px",
            paddingTop: "15px",
            color: "#092435",
          }}
        >
          <Grid
            item
            md={3}
            xs={12}
            style={{
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              type="submit"
              style={{
                backgroundColor: "#60CCD9",
                color: "#092435",
                width: "80vh",
              }}
              onClick={handleOpen}
              startIcon={<SaveIcon />}
            >
              Actualizar
            </Button>
          </Grid>
        </Grid>
        <Divider
          light
          style={{ backgroundColor: "#60CCD9", color: "#092435" }}
        />
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.mpaper}>
              <h2 id="transition-modal-title">Datos actualizados con éxito</h2>
              <Button
                variant="contained"
                type="submit"
                size="small"
                onClick={handleClose}
                style={{ backgroundColor: "#60CCD9", color: "#092435" }}
                className={classes.upgrade}
              >
                Aceptar
              </Button>
            </div>
          </Fade>
        </Modal>
      </form>
    </Container>
  );
}
