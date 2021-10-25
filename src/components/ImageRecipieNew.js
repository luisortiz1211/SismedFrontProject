import AnnounTitle from "@/components/AnnounTitle";
import { yupResolver } from "@hookform/resolvers/yup";
import { CssBaseline } from "@material-ui/core";
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
import { Imagerecipies } from "src/api/imagerecipie";
import * as yup from "yup";

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
  codimage: yup
    .string()
    .required("Ingrese la cantidad ")
    .matches(/^[0-9]+$/, "Ingrese solo números"),
  nameImageRecipie: yup
    .string()
    .required("Ingrese el nombre del examen médico"),
});

export default function ImageRecipieNew({ examID, pid }) {
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
        patient_id: id,
        exploration_id: examID,
      };
      const response = await Imagerecipies.create(userData);
      //console.log("Nuevo examen registrado", response);
      setResult("New exam register");
      enqueueSnackbar("Examen registrado con éxito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      reset();
    } catch (error) {
      if (error.response) {
        enqueueSnackbar("Error al registrar el examen médico", {
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
          <AnnounTitle>
            Si es necesario, agregar el pedido de imagen.
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
            <Grid item md={2} sm={3} xs={12}>
              <TextField
                id="id"
                name="id"
                label="# Exploración"
                className={classes.textField}
                defaultValue={examID}
                //required
                variant="outlined"
                disabled
                InputProps={{
                  readOnly: true,
                }}
                {...register("exploration_id")}
              />
            </Grid>
            <Grid item md={3} sm={4} xs={12}>
              <TextField
                id="codimage"
                name="codimage"
                label="Cantidad"
                className={classes.textField}
                defaultValue=""
                required
                variant="outlined"
                {...register("codimage")}
                error={!!errors.codimage}
                helperText={errors.codimage?.message}
              />
            </Grid>
            <Grid item md={7} sm={5} xs={12}>
              <TextField
                id="nameImageRecipie"
                name="nameImageRecipie"
                label="Nombre del examen"
                className={classes.textField}
                defaultValue=""
                required
                variant="outlined"
                {...register("nameImageRecipie")}
                error={!!errors.nameImageRecipie}
                helperText={errors.nameImageRecipie?.message}
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
                Agregar pedido
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
