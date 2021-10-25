import AnnounTitle from "@/components/AnnounTitle";
import Routes from "@/constants/routes";
import { useAuth } from "src/contexts/auth";
import { Explorationpatients } from "src/api/explorationpatient";
import { yupResolver } from "@hookform/resolvers/yup";
import { CssBaseline, Fade } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@mui/icons-material/Save";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Scheduledays } from "src/api/scheduleday";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto",
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
  btnexplo: {
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
  headExplo: yup
    .string()
    .required(
      "Registre el campo como normal, si no existe novedades que añadir"
    )
    .max(500, "Máximo 500 caracteres"),
  chestExplo: yup
    .string()
    .required(
      "Registre el campo como normal, si no existe novedades que añadir"
    )
    .max(500, "Máximo 500 caracteres"),
  extremitiesExplo: yup
    .string()
    .required(
      "Registre el campo como normal, si no existe novedades que añadir"
    )
    .max(500, "Máximo 500 caracteres"),
  neckExplo: yup
    .string()
    .required(
      "Registre el campo como normal, si no existe novedades que añadir"
    )
    .max(500, "Máximo 500 caracteres"),
  stomachExplo: yup
    .string()
    .required(
      "Registre el campo como normal, si no existe novedades que añadir"
    )
    .max(500, "Máximo 500 caracteres"),
  genitalsExplo: yup
    .string()
    .required(
      "Registre el campo como normal, si no existe novedades que añadir"
    )
    .max(500, "Máximo 500 caracteres"),
  forecastExplo: yup
    .string()
    .required(
      "Registre el campo como normal, si no existe novedades que añadir"
    )
    .max(500, "Máximo 500 caracteres"),
  diagnosisExplo: yup
    .string()
    .required(
      "Registre el campo como normal, si no existe novedades que añadir"
    )
    .max(500, "Máximo 500 caracteres"),
  treatmentExplo: yup
    .string()
    .required(
      "Registre el campo como normal, si no existe novedades que añadir"
    )
    .max(500, "Máximo 500 caracteres"),
});

export default function ExplorationPatientNew({ examID }) {
  const { user } = useAuth();
  const classes = useStyles();
  const router = useRouter();
  const { id, pid, exam_id } = router.query;
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [result, setResult] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar("");

  const handleRegisterDay = async () => {
    try {
      await Scheduledays.update(`${id}`, {
        scheduleDayState: "atendido",
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

  const onSubmit = async (formData) => {
    setUserInfo(null);
    setResult("Sending data...");

    try {
      const userData = {
        ...formData,
        physicalExam_id: exam_id,
        patient_id: pid,
        commentExplo: "Normal",
      };
      const response = await Explorationpatients.create(userData);
      //console.log("Nueva exploración registrado", response);
      setResult("Exploration patient properly register");
      enqueueSnackbar("Exploración registrada con éxito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      reset();
    } catch (error) {
      if (error.response) {
        enqueueSnackbar("Error al registrar antecedente personal", {
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

  return (
    <CssBaseline>
      <Container>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <AnnounTitle>Agregar la información de revisón médica</AnnounTitle>
          {"   "}
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
            <Grid item md={4} xs={12}>
              <TextField
                id="id"
                name="id"
                label="# Historia clínica"
                className={classes.textField}
                defaultValue={pid}
                //required
                disabled
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                {...register("patient_id")}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                id="date"
                name="date"
                label="Fecha de ingreso"
                className={classes.textField}
                defaultValue={new Date().toISOString().slice(0, 10)}
                variant="outlined"
                //required
                disabled
                InputProps={{
                  readOnly: true,
                }}
                //{...register("date")}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                id="physicalExam_id"
                name="patient_id"
                label="N° Examen físico"
                className={classes.textField}
                defaultValue={exam_id}
                variant="outlined"
                //required
                disabled
                InputProps={{
                  readOnly: true,
                }}
                {...register("physicalExam_id")}
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
            <Grid item md={6} xs={12}>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  id="headExplo"
                  name="headExplo"
                  label="Revisión de cabeza"
                  className={classes.textField}
                  defaultValue="Normal"
                  placeholder="Campo vacio no permitido"
                  required
                  variant="outlined"
                  {...register("headExplo")}
                  error={!!errors.headExplo}
                  helperText={errors.headExplo?.message}
                />
              </Grid>
            </Grid>
            <Grid item md={6} xs={12}>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  id="chestExplo"
                  name="chestExplo"
                  label="Revisión de pecho"
                  className={classes.textField}
                  defaultValue="Normal"
                  placeholder="Campo vacio no permitido"
                  required
                  variant="outlined"
                  {...register("chestExplo")}
                  error={!!errors.chestExplo}
                  helperText={errors.chestExplo?.message}
                />
              </Grid>
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
            <Grid item md={6} xs={12}>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  id="extremitiesExplo"
                  name="extremitiesExplo"
                  label="Revisión en extremidades"
                  className={classes.textField}
                  defaultValue="Normal"
                  placeholder="Campo vacio no permitido"
                  required
                  variant="outlined"
                  {...register("extremitiesExplo")}
                  error={!!errors.extremitiesExplo}
                  helperText={errors.extremitiesExplo?.message}
                />
              </Grid>
            </Grid>
            <Grid item md={6} xs={12}>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  id="neckExplo"
                  name="neckExplo"
                  label="Revisión de tórax"
                  className={classes.textField}
                  defaultValue="Normal"
                  placeholder="Campo vacio no permitido"
                  required
                  variant="outlined"
                  {...register("neckExplo")}
                  error={!!errors.neckExplo}
                  helperText={errors.neckExplo?.message}
                />
              </Grid>
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
            <Grid item md={6} xs={12}>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  id="stomachExplo"
                  name="stomachExplo"
                  label="Revisión de estomago"
                  className={classes.textField}
                  defaultValue="Normal"
                  placeholder="Campo vacio no permitido"
                  required
                  variant="outlined"
                  {...register("stomachExplo")}
                  error={!!errors.stomachExplo}
                  helperText={errors.stomachExplo?.message}
                />
              </Grid>
            </Grid>
            <Grid item md={6} xs={12}>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  id="genitalsExplo"
                  name="genitalsExplo"
                  label="Revisión genitales"
                  className={classes.textField}
                  defaultValue="Normal"
                  placeholder="Campo vacio no permitido"
                  required
                  variant="outlined"
                  {...register("genitalsExplo")}
                  error={!!errors.genitalsExplo}
                  helperText={errors.genitalsExplo?.message}
                />
              </Grid>
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
            <Grid item md={12} xs={12}>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  id="forecastExplo"
                  name="forecastExplo"
                  label="Enfermedad actual"
                  className={classes.textField}
                  defaultValue="Normal"
                  placeholder="Campo vacio no permitido"
                  required
                  {...register("forecastExplo")}
                  error={!!errors.forecastExplo}
                  helperText={errors.forecastExplo?.message}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={2}
            style={{
              backgroundColor: "#fff",
              paddingBottom: "10px",
              paddingTop: "15px",
              color: "#092435",
            }}
          >
            <Grid item md={12} xs={12}>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  id="diagnosisExplo"
                  name="diagnosisExplo"
                  label="Diagnostico presuntivo"
                  className={classes.textField}
                  defaultValue="Normal"
                  placeholder="Campo vacio no permitido"
                  required
                  variant="outlined"
                  {...register("diagnosisExplo")}
                  error={!!errors.diagnosisExplo}
                  helperText={errors.diagnosisExplo?.message}
                />
              </Grid>
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
            <Grid item md={12} xs={12}>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  id="treatmentExplo"
                  name="treatmentExplo"
                  label="Tratamiento"
                  className={classes.textField}
                  defaultValue="Normal"
                  placeholder="Campo vacio no permitido"
                  required
                  variant="outlined"
                  {...register("treatmentExplo")}
                  error={!!errors.treatmentExplo}
                  helperText={errors.treatmentExplo?.message}
                />
              </Grid>
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
              <Button
                variant="contained"
                type="submit"
                fullWidth
                className={classes.btnexplo}
                onClick={() => {
                  handleRegisterDay();
                }}
                startIcon={<SaveIcon />}
              >
                Añadir exploración
              </Button>
            </Grid>
          </Grid>
          <Divider
            light
            style={{ backgroundColor: "#60CCD9", color: "#092435" }}
          />
        </form>
      </Container>
    </CssBaseline>
  );
}
