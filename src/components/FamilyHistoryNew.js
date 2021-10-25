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
import { Familyhistories } from "src/api/familyhistory";
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
    .matches(/^[1-9]+$/, "Ingrese solo números")
    .max(2, "Máximo 2 dígitos"),
});

export default function FamilyHistoryNew({ props }) {
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
      const response = await Familyhistories.create(userData);
      //console.log("Antecente familiar registrado", response);
      enqueueSnackbar("Antecedente familiar registrado", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      setResult("Family condition properly register");
      reset();
    } catch (error) {
      if (error.response) {
        enqueueSnackbar("Error al registrar el antecedente", {
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
          <AnnounTitle>Antecedente de enfermedad hereditaria.</AnnounTitle>
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
                {...register("patient_id")}
              />
            </Grid>
            <Grid item lg={6} sm={6} xs={12}>
              <TextField
                id="nameCondition"
                name="nameCondition"
                label="Nombre del antecedente"
                className={classes.textField}
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
                label="Años de padecimiento"
                fullWidth
                className={classes.textField}
              >
                <Select
                  id="yearCondition"
                  {...register("yearCondition")}
                  defaultValue=""
                  error={!!errors.yearCondition}
                  helperText={errors.yearCondition?.message}
                  defaultValue={`1`}
                >
                  <MenuItem value={`1`}>1 Año</MenuItem>
                  <MenuItem value={`2`}>2 Año</MenuItem>
                  <MenuItem value={`3`}>3 Año</MenuItem>
                  <MenuItem value={`4`}>4 Año</MenuItem>
                  <MenuItem value={`5`}>5 Año</MenuItem>
                  <MenuItem value={`10`}>Mas de 5 Año</MenuItem>
                  <MenuItem value={`15`}>Mas de 10 1 Año</MenuItem>
                  <MenuItem value={`20`}>Permanente</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={6} sm={6} xs={12}>
              <FormControl
                variant="outlined"
                label="Parentesco"
                fullWidth
                className={classes.textField}
              >
                <Select
                  id="commentCondition"
                  {...register("commentCondition")}
                  defaultValue="Padre/Madre"
                >
                  <MenuItem value={`Padre/Madre`}>Padre/Madre</MenuItem>
                  <MenuItem value={`Abuelo/Abuela`}>Abuelo/Abuela</MenuItem>
                  <MenuItem value={`Hermano/Hermana`}>Hermano/Hermana</MenuItem>
                  <MenuItem value={`Tío/Tía`}>Tío/Tía</MenuItem>
                  <MenuItem value={`Primos`}>Primos</MenuItem>
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
                //onClick={handleOpen}
                startIcon={<SaveIcon />}
              >
                Añadir APF
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
                <h2 id="transition-modal-title">
                  Antecedente familiar agregado con éxito
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
