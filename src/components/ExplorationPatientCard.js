import Loading from "@/components/Loading";
import { fetcher } from "@/lib/utils";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import useSWR from "swr";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Grid, Box, Paper } from "@material-ui/core";
import { styled } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    //maxWidth: 360,
    backgroundColor: theme.palette.background.primary,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function ExplorationPatientCard({ patientID }) {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const { data, error } = useSWR(`/exploration_patients/${patientID}`, fetcher);
  console.log("examenes fisicos", data);
  if (error) return <div> No se puede mostrar el examen físico </div>;
  if (!data) return <Loading />;

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Informe médico
          </Typography>
          <Typography variant="body2" color="#092435">
            <p>Revisión de cabeza : {data.headExplo}</p>
            <p>Revisión de tórax y espalda : {data.chestExplo}</p>
            <p>Revisión de extremidades : {data.extremitiesExplo}</p>
            <p>Revisión de cuello : {data.neckExplo}</p>
            <p>Exploración de abdomen : {data.stomachExplo}</p>
            <p>Revisión de genitales : {data.genitalsExplo}</p>
            <p>Pronóstico : {data.forecastExplo}</p>
            <p>Diagnóstico : {data.diagnosisExplo}</p>
            <p>Tratamiento : {data.treatmentExplo}</p>
            <p>Observación : {data.commentExplo}</p>
            <p>Fecha de registro : {data.created_at}</p>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
