import AnnounTitle from "@/components/AnnounTitle";
import { yupResolver } from "@hookform/resolvers/yup";
import { CssBaseline, FormControl, MenuItem, Select } from "@material-ui/core";
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
import { Personalhistories } from "src/api/personalhistory";
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
  nameCondition: yup.string().required("Confirme el nombre del antecedente"),
  yearCondition: yup
    .string()
    .required("Ingrese solo el número de años")
    .matches(/^[0-9]+$/, "Ingrese solo números")
    .max(2, "Máximo 2 dígitos"),
  commentCondition: yup
    .string()
    .required("Ingrese cualquier descripción importante")
    .max(100, "Máximo 100 caracteres"),
});

export default function PersonalHistoryNew({ props }) {
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
  const [userInfo, setUserInfo] = useState(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar("");

  const onSubmit = async (formData) => {
    setUserInfo(null);
    setResult("Sending data...");

    try {
      const userData = {
        ...formData,
        patient_id: id,
      };
      const response = await Personalhistories.create(userData);
      //console.log("Nuevo antecedente registrado", response);
      enqueueSnackbar("Antecedente personal registrado", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      setResult("Condition properly register");
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
          <AnnounTitle>Ingresar enfermedad pre-existente</AnnounTitle>
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
                id="id"
                name="id"
                label="# Historia clínica"
                className={classes.textField}
                defaultValue={id}
                //required
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
                id="nameCondition"
                name="nameCondition"
                label="Nombre antecedente"
                className={classes.textField}
                defaultValue=""
                required
                variant="outlined"
                {...register("nameCondition")}
                error={!!errors.nameCondition}
                helperText={errors.nameCondition?.message}
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
            <Grid item lg={6} sm={6} xs={12}>
              <FormControl
                variant="outlined"
                label="Tiempo antecedente"
                fullWidth
                className={classes.textField}
              >
                <Select
                  id="yearCondition"
                  {...register("yearCondition")}
                  defaultValue="1"
                >
                  <MenuItem value={`1`}>1 Año</MenuItem>
                  <MenuItem value={`2`}>2 Año</MenuItem>
                  <MenuItem value={`3`}>3 Año</MenuItem>
                  <MenuItem value={`4`}>4 Año</MenuItem>
                  <MenuItem value={`5`}>5 Año</MenuItem>
                  <MenuItem value={`10`}>Mas de 5 Año</MenuItem>
                  <MenuItem value={`15`}>Mas de 10 Año</MenuItem>
                  <MenuItem value={`20`}>Permanente</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={6} sm={6} xs={12}>
              <TextField
                id="commentCondition"
                name="commentCondition"
                label="Comentario"
                required
                className={classes.textField}
                defaultValue=""
                variant="outlined"
                placeholder="Información a resaltar sobre el antecedente"
                {...register("commentCondition")}
                error={!!errors.commentCondition}
                helperText={errors.commentCondition?.message}
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
                Añadir APP
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
