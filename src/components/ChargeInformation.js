import Routes from "@/constants/routes";
import { Button, CssBaseline, Typography, Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: "auto",
  },
  image: {
    backgroundImage: `url(${"/not-found.svg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "20vh",
    backdropFilter: "blur(5px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
}));

const ChargeInformation = () => {
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>404 | SISMED</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              align="center"
              style={{ color: "#092435" }}
              variant="h4"
            >
              404: La página que estás buscando no está aquí.
            </Typography>
            <Typography
              align="center"
              style={{ color: "#092435" }}
              variant="subtitle2"
            >
              O bien has intentado una ruta turbia o has llegado aquí por error.
              Sea lo que sea, intenta usar la navegación
            </Typography>
            <Box sx={{ textAlign: "center" }}>
              <Image
                alt="Under development"
                src="/undraw_page_not_found_su7k.svg"
                //src="/not-found.svg"
                width={400}
                height={300}
              />
            </Box>
            <Link href={Routes.LOGIN} passHref>
              <Button
                component="a"
                startIcon={<ArrowBackIcon fontSize="small" />}
                sx={{ mt: 3 }}
                variant="contained"
                style={{
                  backgroundColor: "#092435",
                  color: "#4A92A8",
                  margin: "5px",
                }}
              >
                Ir al inicio
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default ChargeInformation;
