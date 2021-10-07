import AnnounTitle from "@/components/AnnounTitle";
import ChargeInformation from "@/components/ChargeInformation";
import Loading from "@/components/Loading";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fade } from "@material-ui/core";
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
import { Patients } from "src/api/patient";
import { fetcher } from "src/api/utils";
import useSWR from "swr";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Ingrese nombre del paciente"),
  lastName: yup.string().required("Ingresa el apellido del paciente"),
  employment: yup.string().required("Ingresa un empleo del paciente"),
  email: yup
    .string()
    .email("Ingresa un correo válido")
    .required("Ingresa el correo electrónico del paciente"),
  movil: yup
    .string()
    .length(9, "Deben ser 9 dígitos")
    .required()
    .matches(/^[0-9]+$/, "Ingrese solo números, exactamente 9 dígitos")
    .max(9, "Deben ser 9 dígitos"),
  landline: yup
    .string()
    .length(8, "Deben ser 8 dígitos")
    .required()
    .matches(/^[0-9]+$/, "Ingrese solo números, exactamente 8 dígitos")
    .max(8, "Deben ser 10 dígitos"),
  address: yup
    .string()

    .required("Ingrese la dirección")
    .max(50, "maximo 50 caracteres"),
  nationality: yup.string().required("Ingrese el país de origen"),
  city: yup.string().required("Ingrese la ciudad de residencia"),
  parish: yup.string().required("Ingrese la provincia"),
});

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

  btnView: {
    backgroundColor: "#60CCD9",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
}));

const PatientsInformation = ({ patientID }) => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;

  const {
    register,
    control,
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

  const onSubmit = async (patient) => {
    try {
      await Patients.update(`${patientID}`, {
        //ci: patient.ci,
        name: patient.name,
        lastName: patient.lastName,
        //sex: patient.sex,
        //civilStatus: patient.civilStatus,
        //birthay: patient.birthay,
        employment: patient.employment,
        email: patient.email,
        movil: patient.movil,
        landline: patient.landline,
        address: patient.address,
        nationality: patient.nationality,
        city: patient.city,
        parish: patient.parish,
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
  const { data, error } = useSWR(`/patients/${patientID}`, fetcher);
  console.log("información del paciente", data);

  if (error)
    return (
      <div>
        <ChargeInformation component={"span"} />
      </div>
    );
  if (!data)
    return (
      <div>
        <Loading component={"span"} />
      </div>
    );

  return (
    <Container variant={"body2"}>
      <form
        component={"span"}
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <AnnounTitle>
          Actualice los datos personales de ser necesario
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
              id="ci"
              name="ci"
              label="Cédula"
              defaultValue={data.ci}
              className={classes.textField}
              disabled
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              //{...register("ci")}
            />
          </Grid>
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="name"
              name="name"
              label="Nombre"
              defaultValue={data.name}
              className={classes.textField}
              required
              variant="outlined"
              {...register("name")}
              helperText={errors.name?.message}
              placeholder={data.name}
            />
          </Grid>
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="lastName"
              name="lastName"
              label="Apellidos"
              defaultValue={data.lastName}
              required
              className={classes.textField}
              variant="outlined"
              {...register("lastName")}
              helperText={errors.lastName?.message}
              placeholder={data.lastName}
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
              id="sex"
              name="sex"
              label="Sexo"
              defaultValue={data.sex === 1 ? "Masculino" : "Femenino"}
              className={classes.textField}
              variant="outlined"
              disabled
              //{...register("sex")}
            />
          </Grid>
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="civilStatus"
              name="civilStatus"
              label="Estado civil"
              defaultValue={
                data.civilStatus === "1"
                  ? "Soltero"
                  : data.civilStatus === "2"
                  ? "Casado"
                  : data.civilStatus === "3"
                  ? "Divordiado"
                  : data.civilStatus === "4"
                  ? "Unión libre"
                  : "Montepio"
              }
              required
              className={classes.textField}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="birthay"
              name="birthay"
              label="Fecha nacimiento"
              defaultValue={data.birthay}
              disabled
              className={classes.textField}
              variant="outlined"
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
              id="employment"
              name="employment"
              label="Ocupación"
              defaultValue={data.employment}
              required
              className={classes.textField}
              variant="outlined"
              {...register("employment")}
              helperText={errors.employment?.message}
              placeholder={data.employment}
            />
          </Grid>
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="email"
              name="email"
              label="Correo electrónico"
              defaultValue={data.email}
              required
              className={classes.textField}
              variant="outlined"
              {...register("email")}
              helperText={errors.email?.message}
              placeholder={data.email}
            />
          </Grid>
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="movil"
              name="movil"
              label="Celular"
              defaultValue={data.movil}
              required
              className={classes.textField}
              variant="outlined"
              {...register("movil")}
              helperText={errors.movil?.message}
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
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="landline"
              name="landline"
              label="Telf. Fijo"
              defaultValue={data.landline}
              required
              className={classes.textField}
              variant="outlined"
              {...register("landline")}
              helperText={errors.landline?.message}
            />
          </Grid>
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="address"
              name="address"
              label="Dirección"
              defaultValue={data.address}
              required
              className={classes.textField}
              variant="outlined"
              {...register("address")}
              helperText={errors.address?.message}
              placeholder={data.address}
            />
          </Grid>
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="nationality"
              name="nationality"
              label="País/Origen"
              defaultValue={data.nationality}
              required
              className={classes.textField}
              variant="outlined"
              {...register("nationality")}
              helperText={errors.nationality?.message}
              placeholder={data.nationality}
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
            paddingBottom: "20px",
            paddingTop: "15px",
            color: "#092435",
          }}
        >
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="city"
              name="city"
              label="Ciudad"
              defaultValue={data.city}
              required
              className={classes.textField}
              variant="outlined"
              {...register("city")}
              helperText={errors.city?.message}
              placeholder={data.city}
            />
          </Grid>
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="parish"
              name="parish"
              label="Provincia"
              defaultValue={data.parish}
              required
              className={classes.textField}
              variant="outlined"
              {...register("parish")}
              helperText={errors.parish?.message}
              placeholder={data.parish}
            />
          </Grid>
          <Grid item lg={3} sm={4} xs={12}>
            <TextField
              id="patient_id"
              name="patient_id"
              label="# Historia clínica"
              defaultValue={data.patient_id}
              className={classes.textField}
              disabled
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              //{...register("patient_id")}
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
              className={classes.btnView}
              fullWidth
              onClick={handleOpen}
              startIcon={<SaveIcon />}
            >
              Actualizar
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
              <h2 id="transition-modal-title">Datos actualizados con éxito</h2>
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
  );
};
export default PatientsInformation;
