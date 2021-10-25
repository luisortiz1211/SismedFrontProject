import AnnounTitle from "@/components/AnnounTitle";
import Title from "@/components/Title";
import Routes from "@/constants/routes";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Backdrop,
  Button,
  Container,
  Fade,
  MenuItem,
  Modal,
  Paper,
  TextField,
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "src/contexts/auth";
import * as yup from "yup";
import withAuth from "../hocs/withAuth";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "15px",
  },
  grow: {
    flexGrow: 1,
    backgroundColor: theme.palette.tertiary.main,
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "auto",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: "40px",
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

  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.tertiary.main,
    "&:hover": {
      backgroundColor: "#4A92A8",
      color: "#fff",
    },
  },
  btncancel: {
    backgroundColor: "#003D59",
    color: "#BBF0E8",
    "&:hover": {
      backgroundColor: "#61908A",
      color: "#092435",
    },
  },
  textField: {
    paddingBottom: "15px",
    color: "#414A4F",
  },

  formControl: {
    color: "#414A4F",
  },

  btncancel: {
    background: "#092435",
    color: "#BBF0E8",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
  btnacept: {
    background: "#60CCD9",
    color: "#092435",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
}));
const schema = yup.object().shape({
  name: yup.string().required("Ingrese su nombre"),
  lastName: yup.string().required("Ingrese su apellido"),
  email: yup
    .string()
    .email("Ingrese un email válido")
    .required("Ingrese su email."),
  password: yup
    .string()
    .required("Ingrese su contraseña")
    .min(6, "La clave debe tener al menos 6 caracteres"),
  password_confirmation: yup
    .string()
    .required("Confirme su contraseña")
    .min(6, "Debe contener igual caracteres que la contraseña"),
  ci: yup.number().required("Confirme su número de cédula"),
  //roleUser: yup.string().required("Confirme el rol de usuario"),
  employment: yup.string().required("Confirme la especialidad"),
});

const Register = () => {
  const classes = useStyles();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [result, setResult] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const { register: doregister, logout } = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar("");

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleLogout = async () => {
    logout();
  };

  const onSubmit = async (formData) => {
    setUserInfo(null);
    setResult("Sending data...");

    try {
      const userData = {
        ...formData,
      };
      const response = await doregister(userData);
      setResult("User properly register");
      logout();
      enqueueSnackbar("Usuario creado con exito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(
          "Usuario no se pudo crear, email o cédula ya existe en el sistema",
          {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          }
        );
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  return (
    <div>
      <Title>
        <AddReactionIcon
          style={{
            color: "#092435",
            fontSize: 35,
            position: "relative",
            top: "6px",
          }}
        />
        {"  "}
        Crear cuenta de usuario
      </Title>
      <Paper elevation={6} style={{ margin: "20px" }}>
        <Container>
          <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            style={{ paddingBottom: "30px" }}
          >
            <AnnounTitle>
              Registrar los campos y crear un nuevo perfil de usuario
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
              <Grid item lg={4} sm={4} xs={12}>
                {" "}
                <TextField
                  variant="outlined"
                  label="Nombres"
                  style={{ textTransform: "upercase" }}
                  className={classes.textField}
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  placeholder="Nombres: Kale Diane"
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <TextField
                  variant="outlined"
                  label="Apellidos"
                  style={{ textTransform: "upercase" }}
                  className={classes.textField}
                  {...register("lastName")}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  placeholder="Apellidos: Frank Herbert"
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <TextField
                  //{...field}
                  variant="outlined"
                  label="Correo electrónico"
                  style={{ textTransform: "upercase" }}
                  className={classes.textField}
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  placeholder="Correo: ejemplocorreo@gmail.com"
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
              <Grid item lg={4} sm={4} xs={12}>
                <TextField
                  variant="outlined"
                  label="Contraseña"
                  style={{ textTransform: "upercase" }}
                  className={classes.textField}
                  {...register("password", { required: true })}
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  placeholder="Contraseña: P@labr5"
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <TextField
                  variant="outlined"
                  label="Confirmar contraseña"
                  style={{ textTransform: "upercase" }}
                  className={classes.textField}
                  {...register("password_confirmation", {
                    required: true,
                  })}
                  type="password"
                  error={!!errors.password_confirmation}
                  helperText={errors.password_confirmation?.message}
                  placeholder="Confirmar: P@labr5"
                />
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <TextField
                  variant="outlined"
                  label="Cédula"
                  className={classes.textField}
                  {...register("ci", { required: true, minLength: 10 })}
                  error={!!errors.ci}
                  helperText={errors.ci?.message}
                  placeholder="Cédula: 172145782X"
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
              <AnnounTitle>Seleccionar tipo y estado de la cuenta</AnnounTitle>
              <Grid item lg={4} sm={4} xs={12}>
                <FormControl
                  variant="outlined"
                  label="Estado"
                  fullWidth
                  className={classes.textField}
                >
                  <Select
                    id="availableStatus"
                    {...register("availableStatus", { required: true })}
                    defaultValue="1"
                  >
                    <MenuItem value={`1`}>Activo</MenuItem>
                    <MenuItem value={`0`}>Desactivado</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <FormControl
                  variant="outlined"
                  label="Tipo"
                  className={classes.textField}
                  fullWidth
                >
                  <Select
                    id="roleUser"
                    {...register("roleUser", { required: true })}
                    defaultValue="ROLE_MEDIC"
                  >
                    <MenuItem value={`ROLE_ADMIN`}>Administrador</MenuItem>
                    <MenuItem value={`ROLE_MEDIC`}>Médico</MenuItem>
                    <MenuItem value={`ROLE_ASSISTENT`}>Asistente</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <FormControl
                  variant="outlined"
                  label="ESpecialidad"
                  className={classes.textField}
                  fullWidth
                >
                  <Select
                    id="employment"
                    {...register("employment", { required: true })}
                    defaultValue="Medicina General"
                  >
                    <MenuItem value={"Medicina General"}>
                      Medicina General
                    </MenuItem>
                    <MenuItem value={"Asistente Médico"}>
                      Asistente Médico
                    </MenuItem>
                    <MenuItem value={"Enfermeria"}>Enfermeria</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Divider
              light
              style={{ backgroundColor: "#60CCD9", color: "#092435" }}
            />{" "}
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
                <Link href={`${Routes.HOME}`} passHref>
                  <Button
                    className={classes.btncancel}
                    variant="contained"
                    fullWidth
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
                {" "}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  // onClick={handleLogout}
                  className={classes.btnacept}
                >
                  Aceptar
                </Button>
              </Grid>
            </Grid>
            <Divider
              light
              style={{ backgroundColor: "#60CCD9", color: "#092435" }}
            />{" "}
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
                    Usuario registrado en el sistema
                  </h2>
                  <Button
                    variant="contained"
                    type="submit"
                    size="small"
                    onClick={() => {
                      handleClose();
                    }}
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
    </div>
  );
};

export default withAuth(Register);
