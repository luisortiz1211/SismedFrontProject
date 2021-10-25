import AnnounTitle from "@/components/AnnounTitle";
import { Drugsrecipies } from "src/api/drugsrecipies";
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
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "40vh",
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
  coddrug: yup
    .string()
    .required("Ingrese la cantidad ")
    .matches(/^[0-9]+$/, "Ingrese solo números"),
  nameDrugRecipie: yup
    .string()
    .required("Ingrese el nombre del pedido de imagen"),
});

export default function DrugsRecipieNew({ examID, pid }) {
  const classes = useStyles();
  const router = useRouter();
  const { id, exam_id } = router.query;
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

  const onSubmit = async (formData) => {
    setUserInfo(null);
    setResult("Sending data...");

    try {
      const userData = {
        ...formData,
        exploration_id: examID,
        patient_id: id,
      };
      const response = await Drugsrecipies.create(userData);
      //console.log("Nuevo medicamento registrado", response);
      setResult("New recipie register");
      enqueueSnackbar("Medicamento registrado con éxito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      reset();
    } catch (error) {
      if (error.response) {
        enqueueSnackbar("Error al registrar el medicamento", {
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
          <AnnounTitle>Agregar medicamentos destinados al paciente</AnnounTitle>
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
            <Grid item md={2} sm={3} xs={12}>
              <TextField
                id="id"
                name="id"
                label="# Exploración"
                className={classes.textField}
                defaultValue={examID}
                disabled
                variant="outlined"
                {...register("exploration_id")}
              />
            </Grid>
            <Grid item md={3} sm={4} xs={12}>
              <TextField
                id="coddrug"
                name="coddrug"
                label="Cantidad"
                className={classes.textField}
                defaultValue=""
                required
                variant="outlined"
                {...register("coddrug")}
                error={!!errors.coddrug}
                helperText={errors.coddrug?.message}
              />
            </Grid>
            <Grid item md={7} sm={5} xs={12}>
              <TextField
                id="nameDrugRecipie"
                name="nameDrugRecipie"
                label="Nombre del medicamento"
                className={classes.textField}
                defaultValue=""
                required
                variant="outlined"
                {...register("nameDrugRecipie")}
                error={!!errors.nameDrugRecipie}
                helperText={errors.nameDrugRecipie?.message}
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
                // onClick={handleOpen}
                startIcon={<SaveIcon />}
              >
                Agregar medicamento
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
