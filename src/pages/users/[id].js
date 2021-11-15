import AnnounTitle from "@/components/AnnounTitle";
import ChargeInformation from "@/components/ChargeInformation";
import LayoutSecondary from "@/components/LayoutSecondary";
import Loading from "@/components/Loading";
import Title from "@/components/Title";
import Routes from "@/constants/routes";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Divider from "@material-ui/core/Divider";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Users } from "src/api/user";
import { fetcher } from "src/api/utils";
import useSWR from "swr";
import * as yup from "yup";
import { CssBaseline } from "@material-ui/core";

const schema = yup.object().shape({
  email: yup.string().email("Ingrese un email").required("Confirme el email"),
});

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: "40px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.tertiary.main,
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
  btncancel: {
    backgroundColor: "#003D59",
    color: "#BBF0E8",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
  btnacept: {
    backgroundColor: "#60CCD9",
    color: "#092435",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
}));

const UserDetails = () => {
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
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [available, setAvailable] = useState(1);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (user) => {
    try {
      await Users.update(
        `${id}`,
        {
          availableStatus: user.availableStatus,
          email: user.email,
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
        console.error(error.response);
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error("Error", error.message);
      }
      console.error(error.config);
    }
  };
  const { data, error } = useSWR(`/users/${id}`, fetcher);
  // console.log("userDetails", data);

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
      <CssBaseline>
        <Container maxWidth="lg">
          <Title>
            <HowToRegIcon
              style={{
                color: "#092435",
                fontSize: 35,
                position: "relative",
                top: "6px",
              }}
            />
            Información de Usuario
          </Title>
          <Paper elevation={6} style={{ padding: "10px", margin: "20px" }}>
            <Container>
              <AnnounTitle>
                Actualice el estado del usuario Activado/Desactivado
              </AnnounTitle>
              <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
              >
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
                      id="id"
                      name="id"
                      label="N° de usuario"
                      defaultValue={data.id}
                      className={classes.textField}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={3} sm={4} xs={12}>
                    <TextField
                      id="name"
                      name="name"
                      label="Nombre"
                      defaultValue={data.name}
                      className={classes.textField}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                      {...register("name")}
                    />
                  </Grid>
                  <Grid item lg={3} sm={4} xs={12}>
                    <TextField
                      id="lastName"
                      name="lastName"
                      label="Apellidos"
                      defaultValue={data.lastName}
                      className={classes.textField}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
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
                      id="email"
                      name="email"
                      label="Correo electrónico"
                      defaultValue={data.email}
                      className={classes.textField}
                      variant="outlined"
                      {...register("email")}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </Grid>
                  <Grid item lg={3} sm={4} xs={12}>
                    <FormControl
                      label="Estado"
                      variant="outlined"
                      fullWidth
                      className={classes.textField}
                    >
                      <Select
                        id="availableStatus"
                        {...register("availableStatus")}
                        defaultValue="1"
                      >
                        <MenuItem value={`1`}>Activo</MenuItem>
                        <MenuItem value={`0`}>Desactivado</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item lg={3} sm={4} xs={12}>
                    <TextField
                      id="roleUser"
                      name="roleUser"
                      label="Usuario"
                      variant="outlined"
                      className={classes.textField}
                      defaultValue={
                        data.roleUser === "ROLE_ADMIN"
                          ? "Administrador"
                          : data.roleUser === "ROLE_ASSISTENT"
                          ? "Asistente"
                          : data.roleUser === "ROLE_MEDIC"
                          ? "Médico"
                          : "No Asignado"
                      }
                      {...register("roleUser")}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
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
                      defaultValue={data.ci.data}
                      className={classes.textField}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                      {...register("ci")}
                    />
                  </Grid>
                  <Grid item lg={3} sm={4} xs={12}>
                    <TextField
                      id="employment"
                      name="employment"
                      label="Especialidad"
                      defaultValue={data.employment.data}
                      className={classes.textField}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                      {...register("employment")}
                    />
                  </Grid>
                  <Grid item lg={3} sm={4} xs={12}>
                    <TextField
                      id="created_at"
                      name="created_at"
                      label="Actualizado"
                      defaultValue={data.created_at}
                      className={classes.textField}
                      variant="outlined"
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
                  style={{
                    backgroundColor: "#FFFFFF",
                    paddingBottom: "10px",
                    paddingTop: "15px",
                    color: "#092435",
                  }}
                >
                  <Grid
                    item
                    lg={4}
                    md={6}
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
                        fullWidth
                        className={classes.btncancel}
                        variant="contained"
                      >
                        Cancelar
                      </Button>
                    </Link>
                  </Grid>

                  <Grid
                    item
                    lg={4}
                    md={6}
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
                      className={classes.btnacept}
                      //onClick={handleOpen}
                    >
                      Aceptar
                    </Button>
                  </Grid>
                </Grid>
                <Divider
                  light
                  style={{ backgroundColor: "#60CCD9", color: "#092435" }}
                />
                {/* <Modal
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
                        Usuario{" "}
                        {data.name +
                          "  " +
                          data.lastName +
                          "  " +
                          "modificado con éxito"}
                      </h2>

                      <Button
                        variant="contained"
                        type="submit"
                        size="small"
                        style={{ backgroundColor: "#60CCD9", color: "#092435" }}
                        className={classes.upgrade}
                        onClick={handleClose}
                      >
                        Aceptar
                      </Button>
                    </div>
                  </Fade>
                </Modal> */}
              </form>
            </Container>
          </Paper>
        </Container>
      </CssBaseline>
    </LayoutSecondary>
  );
};
export default UserDetails;
