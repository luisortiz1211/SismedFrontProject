import { Box, Grid, Link as MuiLink, Typography } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Subtitulos del footer
function Copyright() {
  const classes = useStyles();
  return (
    <div
      style={{
        backgroundColor: "#60CCD9",
        padding: "8px",
        color: "#092435",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography variant="body2" align="center">
        {"Copyright © "}
        {" SISTEMA MEDICO "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
}
// Subtitulos del footer
function Copyright1() {
  const classes = useStyles();
  return (
    <div
      style={{
        backgroundColor: "#092435",
        padding: "5px",
        color: "#60CCD9",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography variant="subtitle2" align="center">
        {"Desarrollado por Luis Ortiz "}
      </Typography>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    padding: "30px",
    backgroundColor: "#092435",
  },
  footer1: {
    backgroundColor: "#60CCD9",
  },
  logo: {
    //display: "none",
    //padding: 8,
    filter: "invert(100%) !important",
    color: "#fffff !important",
  },
}));
// Footer
const StickyFooter = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <footer className={classes.footer}>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          style={{
            backgroundColor: "#092435",
            padding: "5px",
            color: "#BBF0E8",
          }}
        >
          <Grid item xs={2}>
            <Box
              className={classes.logo}
              style={{
                filter: "invert(100%)",
                color: "#fffff",
                position: "relative",
                left: "11px",
              }}
            >
              <Link href="/login" passHref>
                <MuiLink>
                  <Image
                    src="/logosismed1.png"
                    alt="Sismed"
                    width={100}
                    height={50}
                  />
                </MuiLink>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="subtitle1" align="center">
              Horario de atención: Lunes a Viernes de 9:00 a 17:00
            </Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="subtitle1" align="center">
              Av. Amazonas y Tomas de Berlanga
            </Typography>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography variant="subtitle1" align="center" component="p">
              0939573837 {"/"} 0999905876
            </Typography>
          </Grid>
        </Grid>
      </footer>
      <Copyright />
      <Copyright1 />
    </React.Fragment>
  );
};
export default StickyFooter;
