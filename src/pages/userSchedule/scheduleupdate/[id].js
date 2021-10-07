import AnnounTitle from "@/components/AnnounTitle";
import ChargeInformation from "@/components/ChargeInformation";
import LayoutSecondary from "@/components/LayoutSecondary";
import Loading from "@/components/Loading";
import Title from "@/components/Title";
import Routes from "@/constants/routes";
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
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveIcon from "@mui/icons-material/Save";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Scheduleusers } from "src/api/scheduleuser";
import { fetcher } from "src/api/utils";
import useSWR from "swr";
import * as yup from "yup";

const schema = yup.object().shape({
  startTime: yup.string().required("Ingrese la hora de inicio"),
  finishTime: yup.string().required("Ingrese la hora de final del turno"),
});

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
    backgroundColor: "#003D59",
    color: "#BBF0E8",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
  btnEdit: {
    backgroundColor: "#4A92A8",
    color: "#fff",
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

const ScheduleUpdate = () => {
  const classes = useStyles();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

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
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (schedule) => {
    try {
      await Scheduleusers.update(`${id}`, {
        startTime: schedule.startTime,
        finishTime: schedule.finishTime,
        availableStatus: 0,
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
  const handleDelete = async () => {
    try {
      await Scheduleusers.deleteSchedule(`${id}`);
    } catch (error) {
      if (error.response) {
        //alert(error.response.message);
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  const { data, error } = useSWR(`/schedule_users/${id}`, fetcher);
  //console.log("horarios por usuario", data);
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
          <UploadFileIcon
            style={{
              color: "#092435",
              fontSize: 35,
              position: "relative",
              top: "6px",
            }}
          />
          Modificar horario
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
                    Realice cambios en la hora o elimine el horario
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
                    <Grid item md={4} sm={3} xs={12}>
                      <TextField
                        id="userDay"
                        name="userDay"
                        label="Día"
                        defaultValue={data.userDay}
                        className={classes.textField}
                        variant="outlined"
                        //{...register("ci")}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item md={4} sm={3} xs={12}>
                      <TextField
                        id="startTime"
                        name="startTime"
                        label="Hora inicio"
                        defaultValue={data.startTime}
                        className={classes.textField}
                        variant="outlined"
                        placeholder="ej. 12:30"
                        {...register("startTime")}
                        helperText={errors.startTime?.message}
                      />
                    </Grid>
                    <Grid item md={4} sm={3} xs={12}>
                      <TextField
                        id="finishTime"
                        name="finishTime"
                        label="Hora final"
                        defaultValue={data.finishTime}
                        className={classes.textField}
                        variant="outlined"
                        placeholder="ej. 12:30"
                        {...register("finishTime")}
                        helperText={errors.finishTime?.message}
                      />
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
                        <Link href={`/userSchedule/${data.user_id}`} passHref>
                          <Button
                            variant="contained"
                            fullWidth
                            className={classes.btnCancel}
                          >
                            Cancelar
                          </Button>
                        </Link>
                      </Grid>

                      {data.availableStatus === 0 ? (
                        <>
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
                              href={`${Routes.SCHEDULEUSER}/${data.user_id}`}
                              passHref
                            >
                              <Button
                                className={classes.btnEdit}
                                variant="contained"
                                fullWidth
                                onClick={handleDelete}
                                startIcon={<DeleteForeverIcon />}
                              >
                                Eliminar
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
                              className={classes.btnSave}
                              onClick={handleOpen}
                              startIcon={<SaveIcon />}
                            >
                              Actualizar
                            </Button>
                          </Grid>
                        </>
                      ) : (
                        "No se puede modificar o eliminar el horario"
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
                          Cambios realizados con éxito
                        </h2>
                        <Link
                          href={`${Routes.SCHEDULEUSER}/${data.user_id}`}
                          passHref
                        >
                          <Button
                            variant="contained"
                            type="submit"
                            size="small"
                            style={{
                              backgroundColor: "#60CCD9",
                              color: "#092435",
                            }}
                            className={classes.upgrade}
                            onClick={handleClose}
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
export default ScheduleUpdate;
