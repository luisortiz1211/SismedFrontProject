import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Routes from "../constants/routes";

const useStyles = makeStyles((theme) => ({
  btnvolver: {
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
  btninicio: {
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
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
      spacing={1}
    >
      <Grid item>
        {" "}
        <Button
          variant="contained"
          type="button"
          size="small"
          style={{
            backgroundColor: "#60CCD9",
            color: "#092435",
            textTransform: "none",
          }}
          className={classes.btnvolver}
          onClick={() => router.back()}
        >
          <ArrowBackIcon />
          Volver atrás
        </Button>
      </Grid>
      <Grid item>
        <Link href={Routes.HOME} passHref>
          <Button
            variant="contained"
            type="button"
            size="small"
            style={{
              backgroundColor: "#092435",
              color: "#fff",
              textTransform: "none",
            }}
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
