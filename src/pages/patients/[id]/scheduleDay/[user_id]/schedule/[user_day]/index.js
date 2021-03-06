import AnnounTitle from "@/components/AnnounTitle";
import ChargeInformation from "@/components/ChargeInformation";
import LayoutSecondary from "@/components/LayoutSecondary";
import Loading from "@/components/Loading";
import Title from "@/components/Title";
import { yupResolver } from "@hookform/resolvers/yup";
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
import PostAddIcon from "@mui/icons-material/PostAdd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
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

  btnasign: {
    textTransform: "none",
    background: "#60CCD9",
    color: "#092435",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
  btncancel: {
    backgroundColor: "#092435",
    color: "#60CCD9",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
}));

const ShiftSelect = () => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { id, user_id, user_day } = router.query;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar("");

  const [result, setResult] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const onSubmit = async (formData) => {
    setUserInfo(null);
    setResult("Sending data...");
    try {
      const userData = {
        ...formData,
        scheduleDayState: "pendiente",
        patient_id: id,
        userAssigned: user_id,
        schedule_id: user_day,
      };
      const response = await Scheduledays.create(userData);
      //console.log("Nueva cita registrada", response);
      setResult("Date properly register");
      //alert("Cita asignada ");
      enqueueSnackbar("Guardado con ??xito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
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
  const handleSchedule = async (schedule_day) => {
    try {
      await Scheduleusers.update(
        `${user_day}`,
        {
          availableStatus: 1,
        },
        enqueueSnackbar("Guardado con ??xito", {
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
        //console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  const { data, error } = useSWR(`/schedule_users/${user_day}`, fetcher);
  //console.log("horario para agendar", data);
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
        <Container maxWidth="lg" direction="row">
          <Title>
            <PostAddIcon
              style={{
                color: "#092435",
                fontSize: 35,
                position: "relative",
                top: "6px",
              }}
            />
            Turno seleccionado
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
                      Verifique la hora antes de aceptar, para cancelar el turno
                      dir??jase a la secci??n Agenda pacientes
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
                      <Grid item md={3} sm={6} xs={12}>
                        <TextField
                          id="scheduleDay"
                          name="scheduleDay"
                          label="D??a"
                          defaultValue={data.userDay}
                          className={classes.textField}
                          variant="outlined"
                          InputProps={{
                            readOnly: true,
                          }}
                          {...register("scheduleDay")}
                        />
                      </Grid>
                      <Grid item md={3} sm={6} xs={12}>
                        <TextField
                          id="availableStatus"
                          name="availableStatus"
                          label="Estado"
                          defaultValue={
                            data.availableStatus === false
                              ? "Disponible"
                              : "Asignado"
                          }
                          className={classes.textField}
                          variant="outlined"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item md={3} sm={6} xs={12}>
                        <TextField
                          id="scheduleTime"
                          name="scheduleTime"
                          label="Inicio Turno"
                          defaultValue={data.startTime}
                          className={classes.textField}
                          variant="outlined"
                          InputProps={{
                            readOnly: true,
                          }}
                          {...register("scheduleTime")}
                        />
                      </Grid>
                      <Grid item md={3} sm={6} xs={12}>
                        <TextField
                          id="finishTime"
                          name="finishTime"
                          label="Fin turno"
                          defaultValue={data.finishTime}
                          className={classes.textField}
                          variant="outlined"
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
                            href={`/patients/${id}/scheduleDay/${user_id}/`}
                            as={`/patients/${id}/scheduleDay/${user_id}/`}
                            passHref
                          >
                            <Button
                              className={classes.btncancel}
                              variant="contained"
                              fullWidth
                            >
                              Cancelar
                            </Button>
                          </Link>
                        </Grid>

                        {data.availableStatus === false ? (
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
                              className={classes.btnasign}
                              onClick={() => {
                                handleSchedule();
                              }}
                            >
                              Agendar cita
                            </Button>
                          </Grid>
                        ) : (
                          "Cita no disponible, ingrese en la secci??n Agenda pacientes para cancelar"
                        )}
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </CssBaseline>
    </LayoutSecondary>
  );
};
export default ShiftSelect;
