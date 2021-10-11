import AnnounTitle from "@/components/AnnounTitle";
import ChargeInformation from "@/components/ChargeInformation";
import Loading from "@/components/Loading";
import { yupResolver } from "@hookform/resolvers/yup";
import { CssBaseline, Fade } from "@material-ui/core";
import { FormControl, MenuItem, Select } from "@material-ui/core/";
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
import { Physicalexams } from "src/api/physicalexam";
import { fetcher } from "src/api/utils";
import { useAuth } from "src/contexts/auth";
import useSWR from "swr";
import * as yup from "yup";

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
    .max(100, "Máximo 100 caracteres"),
  comment: yup
    .string()
    .required("Ingrese algún detalle adicional")
    .max(100, "Máximo 100 caracteres"),
  currentDrug: yup
    .string()
    .required("Ingrese si tomo algún medicamento")
    .max(100, "Máximo 100 caracteres"),
});

const PhysicalExamUpdate = ({ examID }) => {
  const classes = useStyles();
  const { user } = useAuth();
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

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (physicalExam) => {
    try {
      await Physicalexams.update(`${examID}`, {
        physicalExam: physicalExam.heartRate,
        bloodPleasure: physicalExam.bloodPleasure,
        weight: physicalExam.weight,
        height: physicalExam.height,
        idealWeight: physicalExam.idealWeight,
        temp: physicalExam.temp,
        tobacco: physicalExam.tobacco,
        alcohol: physicalExam.alcohol,
        drugs: physicalExam.drugs,
        apetiteChanges: physicalExam.apetiteChanges,
        dreamChanges: physicalExam.dreamChanges,
        currentCondition: physicalExam.currentCondition,
        comment: physicalExam.comment,
        currentDrug: physicalExam.currentDrug,
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
  const { data, error } = useSWR(`/physical_exams/${examID}`, fetcher);
  console.log("información del examen", data);

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
    <CssBaseline>
      <Container>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <AnnounTitle>
            Actualice el examen físico, o continue con la exploración.
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
                id="id"
                name="id"
                label="# Historia clínica"
                className={classes.textField}
                defaultValue={data.patient_id}
                //required
                disabled
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                {...register("patient_id")}
              />
            </Grid>
            <Grid item lg={3} sm={4} xs={12}>
              <TextField
                id="created_at"
                name="created_at"
                label="Fecha de ingreso"
                className={classes.textField}
                defaultValue={data.created_at}
                //required
                variant="outlined"
                disabled
                InputProps={{
                  readOnly: true,
                }}
                //{...register("date")}
              />
            </Grid>
            <Grid item lg={3} sm={4} xs={12}>
              <TextField
                id="physicalExam_id"
                name="physicalExam_id"
                label="#Examen físico"
                className={classes.textField}
                defaultValue={data.physicalExam_id}
                //required
                disabled
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                {...register("user_id")}
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
                label="Ritmo cardiaco"
                className={classes.textField}
                defaultValue={data.heartRate}
                required
                variant="outlined"
                {...register("heartRate")}
                helperText={errors.heartRate?.message}
              />
            </Grid>
            <Grid item lg={3} sm={4} xs={12}>
              <TextField
                id="bloodPleasure"
                name="bloodPleasure"
                label="Presión arterial"
                className={classes.textField}
                defaultValue={data.bloodPleasure}
                required
                variant="outlined"
                {...register("bloodPleasure")}
                helperText={errors.bloodPleasure?.message}
              />
            </Grid>
            <Grid item lg={3} sm={4} xs={12}>
              <TextField
                id="temp"
                name="temp"
                label="Temperatura"
                className={classes.textField}
                defaultValue={data.temp}
                required
                variant="outlined"
                {...register("temp")}
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
                label="Peso"
                required
                className={classes.textField}
                defaultValue={data.weight}
                variant="outlined"
                {...register("weight")}
                helperText={errors.weight?.message}
              />
            </Grid>
            <Grid item lg={3} sm={4} xs={12}>
              <TextField
                id="height"
                name="height"
                label="Estatura"
                className={classes.textField}
                defaultValue={data.height}
                required
                variant="outlined"
                {...register("height")}
                helperText={errors.height?.message}
              />
            </Grid>
            <Grid item lg={3} sm={4} xs={12}>
              <TextField
                id="idealWeight"
                name="idealWeight"
                label="Cintura"
                className={classes.textField}
                defaultValue={data.idealWeight}
                required
                variant="outlined"
                {...register("idealWeight")}
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
                    defaultValue={data.tobacco}
                  >
                    <MenuItem value={``}></MenuItem>
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
                    defaultValue={data.drugs}
                  >
                    <MenuItem value={``}></MenuItem>
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
                    defaultValue={data.alcohol}
                  >
                    <MenuItem value={``}></MenuItem>
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
                    defaultValue={data.apetiteChanges}
                  >
                    <MenuItem value={``}></MenuItem>
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
                    defaultValue={data.dreamChanges}
                  >
                    <MenuItem value={``}></MenuItem>
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
            <Grid item lg={3} sm={4} xs={12}>
              <TextField
                id="currentCondition"
                name="currentCondition"
                label="Síntomas actuales"
                className={classes.textField}
                defaultValue={data.currentCondition}
                required
                variant="outlined"
                {...register("currentCondition")}
                helperText={errors.currentCondition?.message}
              />
            </Grid>
            <Grid item lg={3} sm={4} xs={12}>
              <TextField
                id="comment"
                name="comment"
                label="Comentario"
                className={classes.textField}
                defaultValue={data.comment}
                required
                variant="outlined"
                {...register("comment")}
                helperText={errors.comment?.message}
              />
            </Grid>
            <Grid item lg={3} sm={4} xs={12}>
              <TextField
                id="currentDrug"
                name="currentDrug"
                label="Medicamento prescrito"
                className={classes.textField}
                defaultValue={data.currentDrug}
                variant="outlined"
                {...register("currentDrug")}
                helperText={errors.currentDrug?.message}
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
                className={classes.btnexplo}
                onClick={handleOpen}
                startIcon={<SaveIcon />}
              >
                Actualizar examen
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
                  Examen físico actualizado con éxito
                </h2>
                <Button
                  variant="contained"
                  type="submit"
                  size="small"
                  onClick={handleClose}
                  className={classes.btnexplo}
                >
                  Aceptar
                </Button>
              </div>
            </Fade>
          </Modal>
        </form>
      </Container>
    </CssBaseline>
  );
};
export default PhysicalExamUpdate;
