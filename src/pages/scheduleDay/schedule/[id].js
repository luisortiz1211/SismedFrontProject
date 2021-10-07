import AnnounTitle from "@/components/AnnounTitle";
import ChargeInformation from "@/components/ChargeInformation";
import LayoutSecondary from "@/components/LayoutSecondary";
import Loading from "@/components/Loading";
import Title from "@/components/Title";
import {
  Backdrop,
  Box,
  Button,
  CssBaseline,
  Fade,
  Grid,
  Modal,
  TextField,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Scheduledays } from "src/api/scheduleday";
import { Scheduleusers } from "src/api/scheduleuser";
import { fetcher } from "src/api/utils";
import useSWR from "swr";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto",
  },
  image: {
    backgroundImage: `url(${"/portada.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "right",
    height: "auto",
  },
  paper: {
    margin: theme.spacing(8, 4),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  button: {
    margin: theme.spacing(1),
  },

  logo: {
    alignItems: "center",
    backgroundPosition: "center",
    justifyContent: "center",
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
  btnCancel: {
    backgroundColor: "#092435",
    color: "#BBF0E8",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
  btnEdit: {
    backgroundColor: "#4A92A8",
    color: "#BBF0E8",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
  btnSave: {
    backgroundColor: "#60CCD9",
    color: "#092435",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
}));

const RegisterCancel = () => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { id } = router.query;
  const [open, setOpen] = useState(false);
  const [opendel, setDel] = useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // actualizar tabla en schedule_days se dirige a resgitrar historia
  const onSubmit = async (schedule) => {
    try {
      await Scheduledays.update(`${id}`, {
        scheduleDay: schedule.scheduleDay,
        scheduleTime: schedule.scheduleTime,
        userAssigned: schedule.userAssigned,
        scheduleDayState: "registrado",
        patient_id: schedule.patient_id,
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
  // cancelar cita en la tabla schedule_days
  const handleCancelDay = async () => {
    try {
      await Scheduledays.update(`${id}`, { scheduleDayState: "cancelado" });
    } catch (error) {
      if (error.response) {
        alert(error.response.message);
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };
  // actualizar a registrado para ingresar datos médicos

  // cancelar horario en schedule_user
  const handleCancelUser = async () => {
    try {
      await Scheduleusers.update(`${data.schedule_id}`, {
        availableStatus: 0,
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.message);
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  const { data, error } = useSWR(`/schedule_days/${id}`, fetcher);
  //console.log("horario de agenda", data);
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
      <CssBaseline />
      <Container maxWidth="lg" direction="row">
        <Title>
          <ChangeCircleIcon
            style={{
              color: "#092435",
              fontSize: 35,
              position: "relative",
              top: "6px",
            }}
          />
          Registrar/Cancelar cita
        </Title>
        <Paper
          className={classes.root}
          elevation={6}
          style={{ margin: "20px" }}
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            component="main"
            className={(classes.root, classes.image)}
          >
            <Grid item xs={12} md={4} component="main">
              <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                  {" "}
                  <Box
                    display={{ xs: "none", sm: "block" }}
                    style={{ padding: "10px" }}
                  >
                    <Image
                      src="/logosismed2.png"
                      alt="Sismed"
                      width={150}
                      height={150}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={8} component={Paper} elevation={6} square>
              <div className={classes.paper}>
                <form
                  className={classes.root}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <AnnounTitle>
                    Seleccione examinar para continuar con la atención.
                  </AnnounTitle>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    spacing={1}
                    style={{
                      paddingBottom: "15px",
                      paddingTop: "20px",
                      color: "#092435",
                    }}
                  >
                    <Grid item md={2} sm={2} xs={12}>
                      <TextField
                        id="scheduleDay"
                        name="scheduleDay"
                        label="Día"
                        defaultValue={data.scheduleDay}
                        className={classes.textField}
                        variant="outlined"
                        {...register("scheduleDay")}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item md={3} sm={3} xs={12}>
                      <TextField
                        id="scheduleTime"
                        name="scheduleTime"
                        label="Inicio turno"
                        defaultValue={data.scheduleTime}
                        className={classes.textField}
                        variant="outlined"
                        {...register("scheduleTime")}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item md={2} sm={2} xs={12}>
                      <TextField
                        id="userAssigned"
                        name="userAssigned"
                        label="ID Médico"
                        defaultValue={data.userAssigned}
                        className={classes.textField}
                        variant="outlined"
                        {...register("userAssigned")}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item md={3} sm={3} xs={12}>
                      <TextField
                        id="scheduleDayState"
                        name="scheduleDayState"
                        label="Estado"
                        defaultValue={data.scheduleDayState}
                        className={classes.textField}
                        variant="outlined"
                        //{...register("scheduleDayState")}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item md={2} sm={2} xs={12}>
                      <TextField
                        id="patient_id"
                        name="patient_id"
                        label="# Historia clínica"
                        defaultValue={data.patient_id}
                        className={classes.textField}
                        variant="outlined"
                        {...register("patient_id")}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>

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
                        md={4}
                        sm={4}
                        xs={12}
                        style={{
                          padding: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Link href={`/scheduleDay/schedule/`} passHref>
                          <Button
                            className={classes.btnEdit}
                            variant="contained"
                            fullWidth
                          >
                            Regresar
                          </Button>
                        </Link>
                      </Grid>
                      {data.scheduleDayState === "pendiente" ? (
                        <>
                          {" "}
                          <Grid
                            item
                            md={4}
                            sm={4}
                            xs={12}
                            style={{
                              padding: "10px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Button
                              className={classes.btnCancel}
                              variant="contained"
                              fullWidth
                              onClick={() => {
                                handleCancelUser();
                                handleCancelDay();
                                handleOpen();
                              }}
                            >
                              Cancelar cita
                            </Button>
                          </Grid>
                          <Grid
                            item
                            md={4}
                            sm={4}
                            xs={12}
                            style={{
                              padding: "10px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Link
                              href={`/physicalExam/${data.schedule_day}/patient/${data.patient_id}`}
                              passHref
                            >
                              <Button
                                variant="contained"
                                type="submit"
                                fullWidth
                                className={classes.btnSave}
                                onClick={() => {
                                  handleCancelUser();
                                }}
                              >
                                Examinar
                              </Button>
                            </Link>
                          </Grid>
                        </>
                      ) : (
                        "Cita cancelada o registrada, agendar nuevamente"
                      )}
                    </Grid>
                  </Grid>

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
                          Cita cancelada, horario habilitado en agenda médica.
                        </h2>
                        <Link href={`/scheduleDay/schedule`} passHref>
                          <Button
                            variant="contained"
                            type="submit"
                            size="small"
                            style={{
                              backgroundColor: "#60CCD9",
                              color: "#092435",
                            }}
                            className={classes.upgrade}
                          >
                            Aceptar
                          </Button>
                        </Link>
                      </div>
                    </Fade>
                  </Modal>
                </form>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </LayoutSecondary>
  );
};
export default RegisterCancel;
