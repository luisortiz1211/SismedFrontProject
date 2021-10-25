import AnnounTitle from "@/components/AnnounTitle";
import ChargeInformation from "@/components/ChargeInformation";
import LayoutSecondary from "@/components/LayoutSecondary";
import Loading from "@/components/Loading";
import Title from "@/components/Title";
import Routes from "@/constants/routes";
import { Fade, Paper } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SaveIcon from "@mui/icons-material/Save";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Patients } from "src/api/patient";
import { fetcher } from "src/api/utils";
import useSWR from "swr";
import { useSnackbar } from "notistack";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  ci: yup.number().required("Confirme su número de cédula"),
  name: yup.string().required("Ingrese su nombre"),
  lastName: yup.string().required("Ingrese su apellido"),
  birthay: yup.string().required("Ingrese su fecha de nacimiento"),
  employment: yup.string().required("Defina nombre del empleo"),
  email: yup.string().email("Ingrese un email").required("Confirme el email"),
  movil: yup.number().required("Confirme número telefonico"),
  landline: yup.number().required("Confirme número fijo"),
  address: yup.string().required("Defina nombre del empleo"),
  nationality: yup.string().required("Defina nombre del empleo"),
  city: yup.string().required("Defina nombre del empleo"),
  parish: yup.string().required("Defina nombre del empleo"),
});

const useStyles = makeStyles((theme) => ({
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

  btnCancel: {
    backgroundColor: "#003D59",
    color: "#BBF0E8",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
  btnAgn: {
    backgroundColor: "#4A92A8",
    color: "#092435",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
  btnUpdate: {
    backgroundColor: "#60CCD9",
    color: "#092435",

    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
}));

const PatientDetails = () => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [open, setOpen] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (patient) => {
    try {
      await Patients.update(
        `${id}`,
        {
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
        },
        enqueueSnackbar("Guardado con éxito", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        })
      );
    } catch (error) {
      if (error.response) {
        enqueueSnackbar("Error al guardar", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        //console.error(error.response);
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error("Error", error.message);
      }
      console.error(error.config);
    }
  };
  const { data, error } = useSWR(`/patients/${id}`, fetcher);
  //console.log("patientDetails", data);

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
    <LayoutSecondary>
      <Container maxWidth="lg">
        <Title>
          <AssignmentIndIcon
            style={{
              color: "#092435",
              fontSize: 35,
              position: "relative",
              top: "6px",
            }}
          />
          Actualizar datos del paciente
        </Title>
        <Paper elevation={6} style={{ padding: "10px", margin: "20px" }}>
          <Container>
            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <AnnounTitle>
                Antes de agendar actualice los datos, si es necesario.
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
                    label=" N° cédula"
                    variant="outlined"
                    disabled
                    defaultValue={data.ci}
                    className={classes.textField}
                    InputProps={{
                      readOnly: true,
                    }}
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
                    error={!!errors.name}
                    helperText={errors.name?.message}
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
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
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
                    required
                    className={classes.textField}
                    variant="outlined"
                    disabled
                    InputProps={{
                      readOnly: true,
                    }}
                    //{...register("sex")}
                  />
                </Grid>
                <Grid item lg={3} sm={4} xs={12}>
                  <TextField
                    id="civilStatus"
                    name="civilStatus"
                    label="Estado civil"
                    variant="outlined"
                    disabled
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
                    //{...register("civilStatus")}
                  />
                </Grid>
                <Grid item lg={3} sm={4} xs={12}>
                  <TextField
                    id="birthay"
                    name="birthay"
                    label="Fecha nacimiento"
                    variant="outlined"
                    disabled
                    defaultValue={data.birthay}
                    required
                    className={classes.textField}
                    InputProps={{
                      readOnly: true,
                    }}
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
                    error={!!errors.employment}
                    helperText={errors.employment?.message}
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
                    error={!!errors.email}
                    helperText={errors.email?.message}
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
                    error={!!errors.movil}
                    helperText={errors.movil?.message}
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
                    error={!!errors.landline}
                    helperText={errors.landline?.message}
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
                    error={!!errors.address}
                    helperText={errors.address?.message}
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
                    InputProps={{
                      readOnly: true,
                    }}
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
                    error={!!errors.city}
                    helperText={errors.city?.message}
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
                    error={!!errors.parish}
                    helperText={errors.parish?.message}
                  />
                </Grid>
                <Grid item lg={3} sm={4} xs={12}>
                  <TextField
                    id="patient_id"
                    name="patient_id"
                    label="# Historia clínica"
                    defaultValue={data.patient_id}
                    className={classes.textField}
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
                spacing={2}
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
                  <Link href={`${Routes.PATIENTS}`} passHref>
                    <Button
                      fullWidth
                      className={classes.btnCancel}
                      variant="contained"
                    >
                      Cancelar
                    </Button>
                  </Link>
                </Grid>
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
                  <Link
                    href={`/patients/${id}/scheduleDay`}
                    as={`/patients/${id}/scheduleDay`}
                    passHref
                  >
                    <Button
                      variant="contained"
                      fullWidth
                      className={classes.btnAgn}
                      startIcon={<ScheduleIcon />}
                    >
                      Agendar
                    </Button>
                  </Link>
                </Grid>
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
                    fullWidth
                    className={classes.btnUpdate}
                    // onClick={handleOpen}
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
                    <h2 id="transition-modal-title">
                      Datos actualizados con éxito
                    </h2>
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
        </Paper>
      </Container>
    </LayoutSecondary>
  );
};
export default PatientDetails;
