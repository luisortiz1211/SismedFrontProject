import AnnounTitle from "@/components/AnnounTitle";
import Routes from "@/constants/routes";
import { Emergencycontacts } from "src/api/emergencycontact";
import { yupResolver } from "@hookform/resolvers/yup";
import { CssBaseline, Fade } from "@material-ui/core";
import {
  Backdrop,
  Button,
  Container,
  Divider,
  Grid,
  Modal,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, FormControl, Select, MenuItem } from "@material-ui/core";
import SaveIcon from "@mui/icons-material/Save";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

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
    .length(9, "Deben ser 10 dígitos")
    .required()
    .matches(/^[0-9]+$/, "Ingrese solo números, exactamente 9 dígitos")
    .max(9, "Deben ser 10 dígitos"),
  landline: yup
    .string()
    .length(8, "Deben ser 10 dígitos")
    .required()
    .matches(/^[0-9]+$/, "Ingrese solo números, exactamente 8 dígitos")
    .max(8, "Deben ser 10 dígitos"),
});

export default function EmergencyContactNew() {
  const classes = useStyles();
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
  const [result, setResult] = useState("");
  const [errorsList, setErrorsList] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async (formData) => {
    setUserInfo(null);
    setResult("Sending data...");

    try {
      const contactData = {
        ...formData,
        patient_id: id,
      };
      const response = await Emergencycontacts.create(contactData);
      console.log("Nuevo contacto registrado", response);
      setResult("Contact properly added");
      reset();
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
                helperText={errors.nameContact?.message}
                //placeholder="Kale Diane Frank "
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
                helperText={errors.movil?.message}
                //placeholder="Telf: 99935855"
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
                helperText={errors.landline?.message}
                //placeholder="Telf: 22687555"
              />
            </Grid>
            <Grid item lg={4} sm={4} xs={12}>
              <FormControl
                variant="outlined"
                label="Parentesco"
                fullWidth
                className={classes.textField}
              >
                <Select
                  id="relationShip"
                  {...register("relationShip")}
                  defaultValue="Padre/Madre"
                >
                  <MenuItem value={`Suegro/Suegra`}>Suegro/Suegra</MenuItem>
                  <MenuItem value={`Padre/Madre`}>Padre/Madre</MenuItem>
                  <MenuItem value={`Hijo/Hija`}>Hijo/Hija</MenuItem>
                  <MenuItem value={`Yerno/Nuera`}>Yerno/Nuera</MenuItem>
                  <MenuItem value={`Abuelo/Abuela`}>Abuelo/Abuela</MenuItem>
                  <MenuItem value={`Hermano/Hermana`}>Hermano/Hermana</MenuItem>
                  <MenuItem value={`Nieto/Nieta`}>Nieto/Nieta</MenuItem>
                  <MenuItem value={`Cuñado/Cuñada`}>Cuñado/Cuñada</MenuItem>
                  <MenuItem value={`Tío/Tía`}>Tío/Tía</MenuItem>
                  <MenuItem value={`Sobrino/Sobrina`}>Sobrino/Sobrina</MenuItem>
                  <MenuItem value={`Primos`}>Primos</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={4} sm={4} xs={12}>
              <FormControl
                variant="outlined"
                label="Tipo de sangre"
                fullWidth
                className={classes.textField}
              >
                <Select
                  id="bloodType"
                  {...register("bloodType")}
                  defaultValue="O positivo"
                >
                  <MenuItem value={`O negativo`}>O negativo</MenuItem>
                  <MenuItem value={`O positivo`}>O positivo</MenuItem>
                  <MenuItem value={`A negativo`}>A negativo</MenuItem>
                  <MenuItem value={`A positivo`}>A positivo</MenuItem>
                  <MenuItem value={`B negativo`}>B negativo</MenuItem>
                  <MenuItem value={`B positivo`}>B positivo</MenuItem>
                  <MenuItem value={`AB negativo`}>AB negativo</MenuItem>
                  <MenuItem value={`AB positivo`}>AB positivo</MenuItem>
                </Select>
              </FormControl>
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
                onClick={handleOpen}
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
          </Modal>
        </form>
      </Container>
    </CssBaseline>
  );
}
