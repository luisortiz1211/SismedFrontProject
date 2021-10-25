import Layout from "@/components/Layoutmain";
import Title from "@/components/Title";
import withAuth from "@/hocs/withAuth";
import {
  Box,
  Button,
  CssBaseline, Grid,
  Link,
  Paper
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import Image from "next/image";
import React from "react";
import { useAuth } from "src/contexts/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto",
  },
  image: {
    backgroundImage: `url(${"/portada.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "right",
    height: "auto",
  },
  paper: {
    margin: theme.spacing(8, 4),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root2: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },

  logo: {
    alignItems: "center",
    backgroundPosition: "center",
    justifyContent: "center",
  },
  textField: {
    paddingBottom: "15px",
    color: "#414A4F",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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
}));

const AttentionPatient = () => {
  const classes = useStyles();
  const { user } = useAuth();

  return (
    <Layout>
      <CssBaseline />
      <Container maxWidth="lg" direction="row">
        <Title>
          {" "}
          <ListAltIcon
            style={{
              color: "#092435",
              fontSize: 40,
              position: "relative",
              top: "7px",
            }}
          />{" "}
          Atención de pacientes
        </Title>
        <Paper
          className={classes.root}
          elevation={6}
          style={{ margin: "20px" }}
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            component="main"
            className={(classes.root, classes.image)}
          >
            <Grid item xs={12} md={4} component="main">
              <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                  {" "}
                  <Box
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

            <Grid item xs={12} md={8} component={Paper} elevation={6} square>
              <div className={classes.paper}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                  style={{
                    paddingBottom: "15px",
                    paddingTop: "20px",
                    color: "#092435",
                  }}
                >
                  <Grid
                    item
                    md={4}
                    xs={12}
                    style={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Grid container justifyContent="center">
                      <Grid item md={6} sm={3} xs={3}>
                        {" "}
                        <Link href={`/scheduleDay/schedule`} passHref>
                          <Button
                            className={classes.button}
                            variant="contained"
                            style={{
                              color: "#60CCD9",
                            }}
                            color="primary"
                          >
                            <Grid
                              container
                              style={{ textAlign: "center" }}
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Grid item>
                                <AssignmentIcon style={{ fontSize: 80 }} />
                              </Grid>
                              <Grid item>Citas pacientes</Grid>
                            </Grid>
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    md={4}
                    xs={12}
                    style={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {user.roleUser !== "ROLE_ASSISTENT" ? (
                      <Grid container justifyContent="center">
                        <Grid item md={6} sm={3} xs={3}>
                          {" "}
                          <Link href={`/attentions`} passHref>
                            <Button
                              className={classes.button}
                              variant="contained"
                              style={{
                                color: "#60CCD9",
                              }}
                              color="primary"
                            >
                              <Grid
                                container
                                style={{ textAlign: "center" }}
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Grid item>
                                  <LocalHospitalIcon style={{ fontSize: 80 }} />
                                </Grid>
                                <Grid item>Atención pacientes</Grid>
                              </Grid>
                            </Button>
                          </Link>
                        </Grid>
                      </Grid>
                    ) : (
                      ""
                    )}
                  </Grid>

                  <Grid
                    item
                    md={4}
                    xs={12}
                    style={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {user.roleUser === "ROLE_ADMIN" ? (
                      <Grid container justifyContent="center">
                        <Grid item md={6} sm={3} xs={3}>
                          {" "}
                          <Link href={`/report`} passHref>
                            <Button
                              className={classes.button}
                              variant="contained"
                              style={{
                                color: "#60CCD9",
                              }}
                              color="primary"
                            >
                              <Grid
                                container
                                style={{ textAlign: "center" }}
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Grid item>
                                  <AnalyticsIcon style={{ fontSize: 80 }} />
                                </Grid>
                                <Grid item>Reporte Atención</Grid>
                              </Grid>
                            </Button>
                          </Link>
                        </Grid>
                      </Grid>
                    ) : (
                      ""
                    )}
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Layout>
  );
};
export default withAuth(AttentionPatient);
