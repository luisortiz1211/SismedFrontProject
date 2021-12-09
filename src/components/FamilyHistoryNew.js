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

const years = [
  {
    value: "1",
    label: "1 Año",
  },
  {
    value: "2",
    label: "2 Años",
  },
  {
    value: "3",
    label: "3 Años",
  },
  {
    value: "4",
    label: "4 Años",
  },
  {
    value: "5",
    label: "5 Años",
  },
  {
    value: "10",
    label: "Mas de 10 Años",
  },
  {
    value: "15",
    label: "Permanente",
  },
];

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

export default function FamilyHistoryNew() {
  const classes = useStyles();
  const router = useRouter();
  const { patient_id, id } = router.query;
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
  const [year, setYear] = useState("1");
  const [family, setFamily] = useState("Padre/Madre");

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

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };
  const handleChangeFamily = (event) => {
    setFamily(event.target.value);
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
                //defaultValue={patient_id}
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
              <TextField
                id="yearCondition"
                select
                className={classes.textField}
                label="Tiempo de condición"
                value={year}
                {...register("yearCondition")}
                onChange={handleChangeYear}
              >
                {years.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item lg={6} sm={6} xs={12}>
              <TextField
                id="commentCondition"
                select
                className={classes.textField}
                label="Tiempo de condición"
                value={family}
                {...register("commentCondition")}
                onChange={handleChangeFamily}
              >
                {families.map((option) => (
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
                Añadir APF
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
