import AnnounTitle from "@/components/AnnounTitle";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Container,
  CssBaseline,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@mui/icons-material/Save";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Drugallergies } from "src/api/drugallergies";
import * as yup from "yup";

const alergies = [
  {
    value: "Alergia de alimentos",
    label: "Alergia de alimentos",
  },
  {
    value: "Alergia a fármacos",
    label: "Alergia a fármacos",
  },
  {
    value: "Asma alérgico",
    label: "Asma alérgico",
  },
  {
    value: "Dermatitis atópica",
    label: "Dermatitis atópica",
  },

  {
    value: "Poliposis Nasal",
    label: "Poliposis Nasal",
  },
  {
    value: "Rinitis alérgica",
    label: "Rinitis alérgica",
  },
  {
    value: "Urticaria crónica`",
    label: "Urticaria crónica`",
  },
];

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

  btnadd: {
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
  drugName: yup.string().required("Ingrese el medicamento"),
  drugSymptom: yup
    .string()
    .required("Ingrese las caracteristicas de la reacción alergica")
    .max(100, "Máximo 100 caracteres"),
});

export default function DrugAllergieNew({ props }) {
  const classes = useStyles();
  const router = useRouter();
  const { id, patient_id } = router.query;
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
  const [alergie, setAlergie] = useState("Alergia de alimentos");

  const onSubmit = async (formData) => {
    setUserInfo(null);
    setResult("Sending data...");

    try {
      const userData = {
        ...formData,
        patient_id: id,
        drugRemark: "Normal",
      };
      const response = await Drugallergies.create(userData);
      //console.log("Nuevo alergia registrada", response);
      enqueueSnackbar("Alergia registrada con éxito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      //setResult("Allergie properly register");
      reset();
    } catch (error) {
      if (error.response) {
        enqueueSnackbar("Error al registrar una alergia", {
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
  const handleChangeAlergie = (event) => {
    setAlergie(event.target.value);
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
          <AnnounTitle>Registrar alergias del paciente</AnnounTitle>
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
            <Grid item lg={6} sm={6} xs={12}>
              <TextField
                id="patient_id"
                name="patient_id"
                label="# Historia Clínica"
                className={classes.textField}
                //defaultValue={patient_id}
                defaultValue={id}
                disabled
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                {...register("patient_id")}
              />
            </Grid>
            <Grid item lg={6} sm={6} xs={12}>
              <TextField
                id="drugName"
                select
                className={classes.textField}
                label="Tipo de alergia"
                value={alergie}
                {...register("drugName")}
                onChange={handleChangeAlergie}
              >
                {alergies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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
            <Grid item lg={12} sm={12} xs={12}>
              <TextField
                id="drugSymptom"
                name="drugSymptom"
                label="Detalle de la alergia"
                className={classes.textField}
                defaultValue=""
                required
                variant="outlined"
                {...register("drugSymptom")}
                error={!!errors.drugSymptom}
                helperText={errors.drugSymptom?.message}
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
              <Button
                variant="contained"
                type="submit"
                fullWidth
                className={classes.btnadd}
                //onClick={handleOpen}
                startIcon={<SaveIcon />}
              >
                Añadir alergia
              </Button>
            </Grid>
          </Grid>
          <Divider
            light
            style={{ backgroundColor: "#60CCD9", color: "#092435" }}
          />
          {/*   <Modal
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
                  Alergia a medicamento agregado con éxito
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
          </Modal> */}
        </form>
      </Container>
    </CssBaseline>
  );
}
