import AnnounTitle from "@/components/AnnounTitle";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CssBaseline,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Button, Container, Divider, Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@mui/icons-material/Save";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Emergencycontacts } from "src/api/emergencycontact";
import * as yup from "yup";
const families = [
  {
    value: "Padre/Madre",
    label: "Padre/Madre",
  },
  {
    value: "Hijo/Hija",
    label: "Hijo/Hija",
  },
  {
    value: "Abuelo/Abuela",
    label: "Abuelo/Abuela",
  },
  {
    value: "Hermano/Hermana",
    label: "Hermano/Hermana",
  },
  {
    value: "Tío/Tía",
    label: "Tío/Tía",
  },
];
const bloodType = [
  {
    value: `O negativo`,
    label: "O negativo",
  },
  {
    value: "O positivo",
    label: "O positivo",
  },
  {
    value: "A negativo",
    label: "A negativo",
  },
  {
    value: "A positivo",
    label: "A positivo",
  },
  {
    value: "B negativo",
    label: "B negativo",
  },
  {
    value: "B positivo",
    label: "B positivo",
  },
  {
    value: "AB positivo",
    label: "AB positivo",
  },
  {
    value: "AB negativo",
    label: "AB negativo",
  },
];

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
  nameContact: yup.string().required("Ingrese el nombre de contacto"),
  movil: yup
    .string()
    .length(9, "Ingrese solo números, exactamente 9 dígitos")
    .required()
    .matches(/^[0-9]+$/, "Ingrese solo números, exactamente 9 dígitos")
    .max(9, "Deben ser 9 dígitos"),
  landline: yup
    .string()
    .length(8, "Ingrese solo números, exactamente 8 dígitos")
    .required()
    .matches(/^[0-9]+$/, "Ingrese solo números, exactamente 8 dígitos")
    .max(8, "Deben ser 8 dígitos"),
});

export default function EmergencyContactNew({ patientID }) {
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

  const [open, setOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar("");

  const [family, setFamily] = useState("Padre/Madre");
  const [blood, setBlood] = useState("O negativo");

  const onSubmit = async (formData) => {
    setUserInfo(null);
    setResult("Sending data...");

    try {
      const contactData = {
        ...formData,
        patient_id: id,
      };
      const response = await Emergencycontacts.create(contactData, `${id}`);
      //console.log("Nuevo contacto registrado", response);
      enqueueSnackbar("Contacto agregado con éxito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      //setResult("Contact properly added");
      reset();
    } catch (error) {
      if (error.response) {
        enqueueSnackbar("Error al agregar un contacto", {
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
  const handleChange = (event) => {
    setFamily(event.target.value);
  };
  const handleChangeBlood = (event) => {
    setBlood(event.target.value);
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
          <AnnounTitle>Agregar nuevo contacto para emergencia.</AnnounTitle>
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
            <Grid item lg={4} sm={4} xs={12}>
              <TextField
                id="id"
                name="id"
                label="# Historia clínica"
                className={classes.textField}
                //defaultValue={patient_id}
                defaultValue={id}
                variant="outlined"
                disabled
                InputProps={{
                  readOnly: true,
                }}
                {...register("patient_id")}
              />
            </Grid>
            <Grid item lg={4} sm={4} xs={12}>
              <TextField
                id="nameContact"
                name="nameContact"
                label="Nombre del familiar"
                className={classes.textField}
                defaultValue=""
                required
                variant="outlined"
                {...register("nameContact")}
                error={!!errors.nameContact}
                helperText={errors.nameContact?.message}
              />
            </Grid>
            <Grid item lg={4} sm={4} xs={12}>
              <TextField
                id="movil"
                name="movil"
                label="Celular"
                className={classes.textField}
                defaultValue=""
                required
                variant="outlined"
                {...register("movil")}
                error={!!errors.movil}
                helperText={errors.movil?.message}
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
            <Grid item lg={4} sm={4} xs={12}>
              <TextField
                id="landline"
                name="landline"
                label="Telf. Fijo"
                required
                className={classes.textField}
                defaultValue=""
                variant="outlined"
                {...register("landline")}
                error={!!errors.landline}
                helperText={errors.landline?.message}
              />
            </Grid>
            <Grid item lg={4} sm={4} xs={12}>
              <TextField
                id="relationShip"
                select
                className={classes.textField}
                label="Parentesco"
                value={family}
                {...register("relationShip")}
                onChange={handleChange}
              >
                {families.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item lg={4} sm={4} xs={12}>
              <TextField
                id="bloodType"
                select
                className={classes.textField}
                label="Tipo de sangre"
                value={blood}
                {...register("bloodType")}
                onChange={handleChangeBlood}
              >
                {bloodType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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
                Añadir contacto
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
                <h2 id="transition-modal-title">Nuevo contacto agregado</h2>
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
