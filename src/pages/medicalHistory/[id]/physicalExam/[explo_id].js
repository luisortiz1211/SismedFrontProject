import AnnounTitle from "@/components/AnnounTitle";
import DrugsRecipieCard from "@/components/DrugsRecicipeCard";
import ExplorationPatientCard from "@/components/ExplorationPatientCard";
import ImageRecipieCard from "@/components/ImageRecipieCard";
import LayoutSecondary from "@/components/LayoutSecondary";
import PhysicalExamCard from "@/components/PhysicalExamCard";
import Title from "@/components/Title";
import { Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { useRouter } from "next/router";
import React from "react";

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
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <AnnounTitle>
              Se muestra los síntomas de atención y resultados
            </AnnounTitle>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="stretch"
            spacing={2}
          >
            <Grid item>
              {" "}
              <PhysicalExamCard patientID={explo_id} />
            </Grid>
            <Grid item>
              {" "}
              <ExplorationPatientCard patientID={explo_id} />
            </Grid>
            <Grid item>
              {" "}
              <DrugsRecipieCard patientID={explo_id} />
            </Grid>
            <Grid item>
              {" "}
              <ImageRecipieCard patientID={explo_id} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </LayoutSecondary>
  );
};
export default index;
