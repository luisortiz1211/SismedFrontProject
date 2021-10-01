import { Button, Grid } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Routes from "../constants/routes";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  btnvolver: {
    backgroundColor: "#BBF0E8",
    color: "#092435",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#4A92A8",
      color: "#fff",
    },
  },
  btninicio: {
    backgroundColor: "#092435",
    color: "#fff",
    margin: "5px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#4A92A8",
      color: "#ffffff",
    },
  },
}));

export default function ButtonBack() {
  const router = useRouter();
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        {" "}
        <Button
          variant="contained"
          type="button"
          size="small"
          /*  style={{
            backgroundColor: "#BBF0E8",
            color: "#092435",
            textTransform: "none",
          }} */
          className={classes.btnvolver}
          onClick={() => router.back()}
        >
          <ArrowBackIcon />
          Volver atrás
        </Button>
      </Grid>
      <Grid item>
        <Link href={Routes.HOME}>
          <Button
            variant="contained"
            type="button"
            size="small"
            /*     style={{
              backgroundColor: "#092435",
              color: "#fff",
              margin: "5px",
              textTransform: "none",
            }} */
            className={classes.btninicio}
          >
            {" "}
            Ir al inicio
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}
