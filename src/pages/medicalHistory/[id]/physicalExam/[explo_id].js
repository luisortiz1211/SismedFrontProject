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
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BallotIcon from "@material-ui/icons/Ballot";
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
          <BallotIcon
            style={{
              color: "#092435",
              fontSize: 35,
              position: "relative",
              top: "6px",
            }}
          />{" "}
          {"  "}Historia clínica
        </Title>
        <Paper elevation={6} style={{ margin: "20px" }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <AnnounTitle>
              Sintomas y resultados de evaluación médica
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
            <Grid item md={6}>
              {" "}
              <DrugsRecipieCard patientID={explo_id} />
            </Grid>
            <Grid item md={6}>
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
