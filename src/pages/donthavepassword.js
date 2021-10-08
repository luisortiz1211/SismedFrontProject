/* import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Button, TextField } from "@material-ui/core";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../contexts/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Ingresa un correo válido")
    .required("Ingresa tu correo electrónico"),
});

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
  },
  buttonWrapper: {
    textAlign: "center",
  },
}));
const SendPasswordResetEmailPage = () => {
  const { sendPasswordResetEmail } = useAuth();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSendEmail = async ({ email }) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(email);
      setLoading(false);
      console.log("se envio un mensaje con las instrucciones");
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
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
          onSubmit={handleSubmit(onSendEmail)}
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
                //    helperText={errors.email?.message}
              />
            </Grid>

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

export default SendPasswordResetEmailPage;
 */
