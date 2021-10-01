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

export default function PhysicalExamCard({ patientID }) {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const { data, error } = useSWR(`/physical_exams/${patientID}`, fetcher);
  console.log("examenes fisicos", data);
  if (error) return <div> No se puede mostrar el examen físico </div>;
  if (!data) return <Loading />;

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Evaluación y sintomatología
          </Typography>
          <Typography variant="body2" color="#092435">
            <p>Ritmo cardiaco : {data.heartRate}</p>
            <p>Presión arterial : {data.bloodPleasure}</p>
            <p>Peso corporal : {data.weight}</p>
            <p>Estadura : {data.height}</p>
            <p>Diametro cintura : {data.idealWeight}</p>
            <p>Temperatura : {data.temp}</p>
            <p>Consumo de tabaco : {data.tobacco}</p>
            <p>Consumo de alcohol : {data.alcohol}</p>
            <p>Consumo de sustancias : {data.drugs}</p>
            <p>Cambios de apetito : {data.apetiteChanges}</p>
            <p>Sintomas de consulta : {data.currentCondition}</p>
            <p>Observación : {data.comment}</p>
            <p>Medicamentp prescrito : {data.currentDrug}</p>
            <p>Fecha de ingreso : {data.created_at}</p>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
