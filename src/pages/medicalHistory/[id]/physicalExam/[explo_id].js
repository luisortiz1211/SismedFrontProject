import AnnounTitle from "@/components/AnnounTitle";
import LayoutSecondary from "@/components/LayoutSecondary";
import PhysicalExamCard from "@/components/PhysicalExamCard";
import ExplorationPatientCard from "@/components/ExplorationPatientCard";

import Title from "@/components/Title";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import React from "react";
import { useRouter } from "next/router";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    height: "auto",
  },

  button: {
    fontSize: "10px",
  },
});

const index = () => {
  const classes = useStyles();
  const router = useRouter();
  const { id, explo_id } = router.query;

  return (
    <LayoutSecondary>
      <Container maxWidth="lg">
        <Title>
          <PeopleOutlineIcon
            style={{
              color: "#092435",
              fontSize: 35,
              position: "relative",
              top: "6px",
            }}
          />{" "}
          {"  "}Historial de atención
        </Title>
        <Paper elevation={6} style={{ margin: "20px" }}>
          <AnnounTitle>
            Se muestra los sintomas de atención y resultados
          </AnnounTitle>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="stretch"
          >
            <Grid item={4}>
              {" "}
              <PhysicalExamCard patientID={explo_id} />
            </Grid>
            <Grid item={4}>
              {" "}
              <ExplorationPatientCard patientID={explo_id} />
            </Grid>
            <Grid item={4}>
              {" "}
              <ExplorationPatientCard patientID={explo_id} />
            </Grid>
            <Grid item={4}>
              {" "}
              <ExplorationPatientCard patientID={explo_id} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </LayoutSecondary>
  );
};
export default index;
