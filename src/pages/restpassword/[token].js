/* import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Button, TextField } from "@material-ui/core";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../contexts/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import Routes from "../../constants/routes";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Ingresa un correo válido")
    .required("Ingresa tu correo electrónico"),
  password: yup
    .string()
    .required("Ingresa la contraseña")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Campo requerido"),
});

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
  },
  buttonWrapper: {
    textAlign: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const ResetPasswordPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const { confirmPasswordReset } = useAuth();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleClick = (message, variant) => {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
  };

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onResetPassword = async ({
    email,
    password,
    password_confirmation,
  }) => {
    try {
      setLoading(true);
      await confirmPasswordReset(email, password, password_confirmation, token);
      setLoading(false);
      enqueueSnackbar(
        "Tu clave se ha restablecido correctamente, puedes iniciar sesión",
        {
          variant: "success",
        }
      );
      router.push(Routes.LOGIN);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        enqueueSnackbar(translateMessage(error.response.data.status), {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });

        return error.response;
      } else if (error.request) {
        enqueueSnackbar("Ocurrió un error al realizar la petición.", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      } else {
        enqueueSnackbar("Ocurrió un error desconocido :(", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      }
      console.log(error.config);
    }
  };

  return (
    <Grid container justify="center">
      <Grid item xs={6}>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onResetPassword)}
        >
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid xs={12} item>
              <TextField
                id="email"
                name="email"
                type="email"
                label="Correo electrónico"
                inputRef={register}
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid xs={12} item>
              <TextField
                id="password"
                name="password"
                type="password"
                label="Clave"
                inputRef={register}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid xs={12} item>
              <TextField
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                label="Confirmar clave"
                inputRef={register}
                error={!!errors.password_confirmation}
                helperText={errors.password_confirmation?.message}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid xs={12} item className={classes.buttonWrapper}>
              <Button
                name="submit"
                variant="contained"
                type="submit"
                color="primary"
                disabled={loading}
              >
                Enviar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default ResetPasswordPage;
 */
