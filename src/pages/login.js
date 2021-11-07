import withoutAuth from "@/hocs/withoutAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Link as MuiLink,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import Link from "next/link";
import { useSnackbar } from "notistack";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "src/contexts/auth";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Ingrese un email válido")
    .required("El campo email es obligatorio"),
  password: yup
    .string()
    .required("Ingrese su clave")
    .min(6, "La clave debe tener al menos 6 caracteres"),
});
const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto",
  },
  grow: {
    flexGrow: 1,
    backgroundColor: theme.palette.tertiary.main,
  },
  image: {
    backgroundImage: `url(${"/portada.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.tertiary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: "40px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#60CCD9",
    color: "#092435",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
  textField: {
    paddingBottom: "15px",
  },
  appBar: {
    position: "relative",
  },
  logo: {
    alignItems: "center",
    backgroundPosition: "center",
    justifyContent: "center",
  },
}));

const Login = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar("");

  const onSubmit = async (data) => {
    try {
      const userData = await login(data);
      enqueueSnackbar("Bienvenido al sistema SISMED", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    } catch (error) {
      if (error.response) {
        enqueueSnackbar("Verifique usuario o contraseña", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  return (
    <div>
      <CssBaseline />
      <Paper elevation={6} style={{ margin: "20px" }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          component="main"
          className={(classes.root, classes.image)}
        >
          <Grid item xs={12} md={6} component="main">
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              {" "}
              <Grid item>
                {" "}
                <Box
                  md={4}
                  display={{ xs: "none", sm: "block" }}
                  style={{ padding: "10px" }}
                >
                  <Image
                    src="/logosismed2.png"
                    alt="Sismed"
                    width={150}
                    height={150}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}></Avatar>
              <Typography component="h1" variant="h5">
                Inicio de sesión
              </Typography>
              <form
                className={classes.form}
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                style={{ paddingBottom: "30px" }}
              >
                <TextField
                  id="email"
                  name="email"
                  label="Correo electrónico"
                  {...register("email")}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  autoComplete="email"
                  autoFocus
                  className={classes.textField}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  {...register("password")}
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  className={classes.textField}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  //color="primary"
                  className={classes.submit}
                >
                  Ingresar
                </Button>
                <Grid container>
                  <Grid item style={{ color: "#414A4F" }}>
                    <Link href="/olvide-mi-clave" passHref>
                      <MuiLink>Olvido su contraseña?</MuiLink>
                    </Link>
                  </Grid>
                </Grid>
              </form>{" "}
              {/*//////////*/}
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
export default withoutAuth(Login);
