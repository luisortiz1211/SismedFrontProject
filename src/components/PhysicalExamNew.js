import AnnounTitle from "@/components/AnnounTitle";
import { Scheduleusers } from "@/lib/scheduleuser";
import { yupResolver } from "@hookform/resolvers/yup";
import { CssBaseline } from "@material-ui/core";
import { FormControl, MenuItem, Select } from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@mui/icons-material/Save";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Physicalexams } from "src/api/physicalexam";
import { Scheduledays } from "src/api/scheduleday";
import { useAuth } from "src/contexts/auth";
import * as yup from "yup";

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

  btnsave: {
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
  heartRate: yup
    .string()
    .required("Ingrese el ritmo cardiaco ")
    .matches(/^[0-9]+$/, "Ingrese solo números"),

  bloodPleasure: yup.string().required("Ingrese la presión arterial"),
  temp: yup.string().required("Ingrese la temperatura"),
  weight: yup.string().required("Ingrese el peso"),
  height: yup.string().required("Ingrese la estatura"),
  idealWeight: yup.string().required("Ingrese el diámetro de cintura"),

  currentCondition: yup
    .string()
    .required("Ingrese los sintomas actuales")
    .max(200, "Máximo 200 caracteres"),
  comment: yup
    .string()
    .required("Ingrese algún detalle adicional, tomo algún medicamento")
    .max(100, "Máximo 100 caracteres"),
});

const PhysicalExamNew = ({ pid, schid, schuser }) => {
  const classes = useStyles();
  const { user } = useAuth();
  const router = useRouter();
  //const { id } = router.query;
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
      await Scheduledays.update(
        `${schid}`,
        {
          scheduleDayState: "registrado",
        },
        enqueueSnackbar("Paciente registrado en agenda de atención", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        })
      );
    } catch (error) {
      if (error.response) {
        enqueueSnackbar("Error al registrar en agenda de atención", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
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

  const handleCancelUser = async () => {
    try {
      await Scheduleusers.update(
        `${schuser}`,
        {
          availableStatus: 0,
        },
        enqueueSnackbar("Ahora el horario esta disponible", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        })
      );
    } catch (error) {
      if (error.response) {
        enqueueSnackbar("Error al actualizar horario", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        //alert(error.response.message);
        //console.log(error.response);
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
        patient_id: pid,
        schedule_day: schid,
        currentDrug: "Normal",
      };
      const response = await Physicalexams.create(userData);
      //console.log("Examen fisico registrado", response);
      setResult("Physical exam register");
      enqueueSnackbar("Examen físico registrado", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      reset();
    } catch (error) {
      if (error.response) {
        enqueueSnackbar("Error al registrar el examen físico", {
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
          <AnnounTitle>Registrar examen fisico del paciente</AnnounTitle>
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
                label="# Historia clínica"
                className={classes.textField}
                defaultValue={pid}
                disabled
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item lg={3} sm={4} xs={12}>
              <TextField
                id="date"
                name="date"
                label="Fecha de ingreso"
                className={classes.textField}
                defaultValue={new Date()}
                variant="outlined"
                disabled
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item lg={3} sm={4} xs={12}>
              <TextField
                id="patient_id"
                name="patient_id"
                label="Registrado por"
                className={classes.textField}
                defaultValue={user.id}
                disabled
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
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
                id="heartRate"
                name="heartRate"
                label="Ritmo cardiaco - lpm"
                className={classes.textField}
                defaultValue=""
                required
                variant="outlined"
                placeholder="89"
                {...register("heartRate")}
                error={!!errors.heartRate}
                helperText={errors.heartRate?.message}
              />
            </Grid>
            <Grid item lg={3} sm={4} xs={12}>
              <TextField
                id="bloodPleasure"
                name="bloodPleasure"
                label="Presión arterial - mgHg"
                className={classes.textField}
                defaultValue=""
                required
                variant="outlined"
                placeholder="155/95"
                {...register("bloodPleasure")}
                error={!!errors.bloodPleasure}
                helperText={errors.bloodPleasure?.message}
              />
            </Grid>
            <Grid item lg={3} sm={4} xs={12}>
              <TextField
                id="temp"
                name="temp"
                label="Temperatura - g°"
                className={classes.textField}
                defaultValue=""
                required
                placeholder="38"
                variant="outlined"
                {...register("temp")}
                error={!!errors.temp}
                helperText={errors.temp?.message}
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
                id="weight"
                name="weight"
                label="Peso - kg"
                required
                className={classes.textField}
                defaultValue=""
                placeholder="71.5"
                variant="outlined"
                {...register("weight")}
                error={!!errors.weight}
                helperText={errors.weight?.message}
              />
            </Grid>
            <Grid item lg={3} sm={4} xs={12}>
              <TextField
                id="height"
                name="height"
                label="Estatura - cm"
                className={classes.textField}
                defaultValue=""
                required
                placeholder="175.5"
                variant="outlined"
                {...register("height")}
                error={!!errors.height}
                helperText={errors.height?.message}
              />
            </Grid>
            <Grid item lg={3} sm={4} xs={12}>
              <TextField
                id="idealWeight"
                name="idealWeight"
                label="IMC"
                className={classes.textField}
                defaultValue=""
                required
                placeholder="21.5"
                variant="outlined"
                {...register("idealWeight")}
                error={!!errors.idealWeight}
                helperText={errors.idealWeight?.message}
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
            <Grid item lg={4} sm={6} xs={12}>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <p>Tabaco</p>
                <FormControl
                  label="tobacco"
                  variant="outlined"
                  className={classes.textField}
                >
                  <Select
                    id="tobacco"
                    {...register("tobacco", { required: true })}
                    defaultValue={`0`}
                  >
                    <MenuItem value={`1`}>Si</MenuItem>
                    <MenuItem value={`0`}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <p>Sustancias</p>
                <FormControl
                  label="drugs"
                  variant="outlined"
                  className={classes.textField}
                >
                  <Select
                    id="drugs"
                    {...register("drugs", { required: true })}
                    defaultValue={`0`}
                  >
                    <MenuItem value={`1`}>Si</MenuItem>
                    <MenuItem value={`0`}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <p>Alcohol</p>
                <FormControl
                  label="alcohol"
                  variant="outlined"
                  className={classes.textField}
                >
                  <Select
                    id="alcohol"
                    {...register("alcohol", { required: true })}
                    defaultValue={`0`}
                  >
                    <MenuItem value={`1`}>Si</MenuItem>
                    <MenuItem value={`0`}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item lg={6} sm={6} xs={12}>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <p>Cambios de apetito</p>
                <FormControl
                  label="apetiteChanges"
                  variant="outlined"
                  className={classes.textField}
                >
                  <Select
                    id="apetiteChanges"
                    {...register("apetiteChanges", { required: true })}
                    defaultValue={`0`}
                  >
                    <MenuItem value={`1`}>Si</MenuItem>
                    <MenuItem value={`0`}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item lg={6} sm={6} xs={12}>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <p>Cambios de sueño</p>
                <FormControl
                  label="dreamChanges"
                  variant="outlined"
                  className={classes.textField}
                >
                  <Select
                    id="dreamChanges"
                    {...register("dreamChanges", { required: true })}
                    defaultValue={`0`}
                  >
                    <MenuItem value={`1`}>Si</MenuItem>
                    <MenuItem value={`0`}>No</MenuItem>
                  </Select>
                </FormControl>
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
            <Grid item sm={12} xs={12}>
              <TextField
                id="currentCondition"
                name="currentCondition"
                label="Síntomas actuales"
                className={classes.textField}
                defaultValue=""
                required
                variant="outlined"
                {...register("currentCondition")}
                error={!!errors.currentCondition}
                helperText={errors.currentCondition?.message}
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={2}
            style={{
              paddingBottom: "20px",
              paddingTop: "15px",
            }}
          >
            <Grid item sm={12} xs={12}>
              <TextField
                id="comment"
                name="comment"
                label="Comentario"
                className={classes.textField}
                defaultValue=""
                required
                variant="outlined"
                {...register("comment")}
                error={!!errors.comment}
                helperText={errors.comment?.message}
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
              <Button
                variant="contained"
                type="submit"
                fullWidth
                className={classes.btnsave}
                onClick={() => {
                  handleRegisterDay();
                  handleCancelUser();
                }}
                startIcon={<SaveIcon />}
              >
                Guardar examen
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
};
export default PhysicalExamNew;
