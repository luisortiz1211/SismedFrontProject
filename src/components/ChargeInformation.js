import Routes from "@/constants/routes";
import { Button, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import React from "react";
import Box from "@mui/material/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: "auto",
  },
  image: {
    backgroundImage: `url(${"/portada.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "80vh",
    backdropFilter: "blur(5px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
}));

const ChargeInformation = () => {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.root} elevation={3}>
        <Box sx={{ maxWidth: "auto" }}>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            className={classes.image}
          >
            {" "}
            <Grid item>
              <Typography
                component="span"
                variant="h3"
                gutterBottom
                component="div"
                style={{ color: "#092435" }}
              >
                Página no encontrada
              </Typography>
              <Typography
                component="span"
                variant="h6"
                gutterBottom
                component="div"
                style={{ color: "#092435" }}
              >
                Lo sentimos, la página que buscaba no se encuentra aquí. El
                enlace que siguió puede estar roto o ya no existe. Actualice la
                página o ingrese nuevamente a la sesión.
              </Typography>
            </Grid>
            <Grid item>
              {" "}
              <Link href={Routes.LOGIN} passHref>
                <Button
                  variant="contained"
                  type="button"
                  size="small"
                  style={{
                    backgroundColor: "#092435",
                    color: "#4A92A8",
                    margin: "5px",
                  }}
                >
                  {" "}
                  Ir al inicio
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
};
export default ChargeInformation;
