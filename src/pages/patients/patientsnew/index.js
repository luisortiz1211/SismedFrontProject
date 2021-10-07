import AnnounTitle from "@/components/AnnounTitle";
import LayoutSecondary from "@/components/LayoutSecondary";
import Title from "@/components/Title";
import Routes from "@/constants/routes";
import { CssBaseline, Fade, MenuItem, Paper } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SaveIcon from "@mui/icons-material/Save";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Patients } from "src/api/patient";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

  btncancelar: {
    backgroundColor: "#092435",
    color: "#BBF0E8",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
  btncrear: {
    backgroundColor: "#60CCD9",
    color: "#092435",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
}));
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

const PatientNew = ({ props }) => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [result, setResult] = useState("");
  const [errorsList, setErrorsList] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (formData) => {
    setUserInfo(null);
    setResult("Sending data...");

    try {
      const userData = {
        ...formData,
      };
      const response = await Patients.create(userData);
      //      console.log("Nuevo paciente registrado", response);
      setResult("User properly register");
      reset();
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

  return (
    <LayoutSecondary>
      <CssBaseline />
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
          Registrar un nuevo paciente
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
                Ingresar los datos del paciente, para crear una nueva historia
                médica.
              </AnnounTitle>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                spacing={1}
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
                    className={classes.textField}
                    defaultValue=""
                    required
                    variant="outlined"
                    {...register("ci")}
                    helperText={errors.ci?.message}
                    placeholder="Cédula: 172145784X"
                  />
                </Grid>
                <Grid item lg={3} sm={4} xs={12}>
                  <TextField
                    id="name"
                    name="name"
                    label="Nombres"
                    className={classes.textField}
                    defaultValue=""
                    required
                    variant="outlined"
                    {...register("name")}
                    helperText={errors.name?.message}
                    placeholder="Nombre: Dale Diane  "
                  />
                </Grid>
                <Grid item lg={3} sm={4} xs={12}>
                  <TextField
                    id="lastName"
                    name="lastName"
                    label="Apellidos"
                    className={classes.textField}
                    defaultValue=""
                    required
                    variant="outlined"
                    {...register("lastName")}
                    helperText={errors.lastName?.message}
                    placeholder="Apellidos: Frank Herbert"
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
                spacing={1}
                style={{
                  backgroundColor: "#FFFFFF",
                  paddingBottom: "10px",
                  paddingTop: "15px",
                  color: "#092435",
                }}
              >
                <Grid item lg={3} sm={4} xs={12}>
                  <FormControl
                    variant="outlined"
                    label="Sexo"
                    fullWidth
                    className={classes.textField}
                  >
                    <Select
                      id="sex"
                      {...register("sex", { required: true })}
                      defaultValue={"1"}
                    >
                      <MenuItem value={`1`}>Masculino</MenuItem>
                      <MenuItem value={`2`}>Femenino</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item lg={3} sm={4} xs={12}>
                  <FormControl
                    variant="outlined"
                    label="Estado civil"
                    className={classes.textField}
                    fullWidth
                  >
                    <Select
                      id="civilStatus"
                      {...register("civilStatus", { required: true })}
                      defaultValue={"1"}
                    >
                      <MenuItem value={`1`}>Soltero</MenuItem>
                      <MenuItem value={`2`}>Casado</MenuItem>
                      <MenuItem value={`3`}>Divorciado</MenuItem>
                      <MenuItem value={`4`}>Union libre</MenuItem>
                      <MenuItem value={`5`}>Montepio</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item lg={3} sm={4} xs={12}>
                  <TextField
                    id="birthay"
                    name="birthay"
                    label="Fecha nacimiento"
                    className={classes.textField}
                    defaultValue=""
                    required
                    variant="outlined"
                    {...register("birthay")}
                    helperText={errors.birthay?.message}
                    placeholder="Fecha: 1989-12-10"
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
                spacing={1}
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
                    className={classes.textField}
                    defaultValue=""
                    required
                    variant="outlined"
                    {...register("employment")}
                    helperText={errors.employment?.message}
                    placeholder="Ocupación: Profesor"
                  />
                </Grid>
                <Grid item lg={3} sm={4} xs={12}>
                  <TextField
                    id="email"
                    name="email"
                    label="Correo electrónico"
                    className={classes.textField}
                    defaultValue=""
                    required
                    variant="outlined"
                    {...register("email")}
                    helperText={errors.email?.message}
                    placeholder="Correo: ejemplomail@gmail.com"
                  />
                </Grid>
                <Grid item lg={3} sm={4} xs={12}>
                  <TextField
                    id="movil"
                    name="movil"
                    label="Celular"
                    className={classes.textField}
                    defaultValue=""
                    required
                    variant="outlined"
                    {...register("movil")}
                    helperText={errors.movil?.message}
                    placeholder="Celular: 09956235X"
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
                spacing={1}
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
                    className={classes.textField}
                    defaultValue=""
                    required
                    variant="outlined"
                    {...register("landline")}
                    helperText={errors.landline?.message}
                    placeholder="Fijo: 022695566 "
                  />
                </Grid>
                <Grid item lg={3} sm={4} xs={12}>
                  <TextField
                    id="address"
                    name="address"
                    label="Dirección"
                    className={classes.textField}
                    defaultValue=""
                    required
                    variant="outlined"
                    {...register("address")}
                    helperText={errors.address?.message}
                    placeholder="Dirección: Calle A1 y Av Principal"
                  />
                </Grid>
                <Grid item lg={3} sm={4} xs={12}>
                  <TextField
                    id="nationality"
                    name="nationality"
                    label="País/Origen"
                    className={classes.textField}
                    defaultValue=""
                    required
                    variant="outlined"
                    {...register("nationality")}
                    helperText={errors.ci?.message}
                    placeholder="País: Ecuador"
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
                spacing={1}
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
                    className={classes.textField}
                    defaultValue=""
                    required
                    variant="outlined"
                    {...register("city")}
                    helperText={errors.city?.message}
                    placeholder="Ciudad: Quito"
                  />
                </Grid>
                <Grid item lg={3} sm={4} xs={12}>
                  <TextField
                    id="parish"
                    name="parish"
                    label="Provincia"
                    className={classes.textField}
                    defaultValue=""
                    required
                    variant="outlined"
                    {...register("parish")}
                    helperText={errors.parish?.message}
                    placeholder="Provincia: Pichincha"
                  />
                </Grid>
                <Grid item lg={3} sm={4} xs={12}>
                  <TextField
                    id="patient_id"
                    name="patient_id"
                    label="# Historia clínica"
                    disabled
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
                      className={classes.btncancelar}
                      fullWidth
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
                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    className={classes.btncrear}
                    onClick={handleOpen}
                    startIcon={<SaveIcon />}
                  >
                    Crear historia
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
                      fullWidth
                      style={{
                        backgroundColor: "#60CCD9",
                        color: "#092435",
                      }}
                      className={classes.upgrade}
                      onClick={handleClose}
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
export default PatientNew;
