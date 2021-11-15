import Loading from "@/components/Loading";
import { Box, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React from "react";
import { fetcher } from "src/api/utils";
import useSWR from "swr";
import { CssBaseline } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    //maxWidth: 360,
    backgroundColor: "#fff",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  fontcolor: {
    backgroundColor: "#ffff",
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.subtitle2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#092435",
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
  console.log("examen fisicos", data);
  if (error) return <div> No se puede mostrar el examen físico </div>;
  if (!data) return <Loading />;

  return (
    <CssBaseline>
      <Card sx={{ maxWidth: "100%" }}>
        <CardActionArea className={classes.fontcolor}>
          <CardContent>
            <Typography variant="h5" component="div">
              Evaluación y sintomatología
            </Typography>

            <Box sx={{ width: "100%" }}>
              <Grid container>
                <Grid item md={3} xs={6}>
                  <Item
                    style={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "left",
                      backgroundColor: "#BBF0E8",
                    }}
                  >
                    <Typography
                      component={"span"}
                      variant="subtitle2"
                      color="#092435"
                    >
                      <p
                        style={{
                          position: "relative",
                          left: "30px",
                        }}
                      >
                        Ritmo cardiaco :{" "}
                      </p>
                    </Typography>
                  </Item>
                </Grid>
                <Grid item md={3} xs={6}>
                  <Item>
                    <p style={{ color: "#4A92A8" }}>
                      {data.heartRate + "  lpm"}
                    </p>
                  </Item>
                </Grid>
                <Grid item md={3} xs={6}>
                  <Item
                    style={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "left",
                      backgroundColor: "#BBF0E8",
                    }}
                  >
                    <Typography
                      component={"span"}
                      variant="subtitle2"
                      color="#092435"
                    >
                      <p style={{ position: "relative", left: "30px" }}>
                        Presión sanguinea :{" "}
                      </p>
                    </Typography>
                  </Item>
                </Grid>
                <Grid item md={3} xs={6}>
                  <Item>
                    <p style={{ color: "#4A92A8" }}>
                      {data.bloodPleasure + "  mmHg"}
                    </p>
                  </Item>
                </Grid>
                <Grid item md={3} xs={6}>
                  <Item
                    style={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "left",
                    }}
                  >
                    <Typography
                      component={"span"}
                      variant="subtitle2"
                      color="#092435"
                    >
                      <p style={{ position: "relative", left: "30px" }}>
                        Peso corporal :{" "}
                      </p>
                    </Typography>
                  </Item>
                </Grid>
                <Grid item md={3} xs={6}>
                  <Item>
                    <p style={{ color: "#4A92A8" }}>{data.weight + "  kg"}</p>
                  </Item>
                </Grid>{" "}
                <Grid item md={3} xs={6}>
                  <Item
                    style={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "left",
                    }}
                  >
                    <Typography
                      component={"span"}
                      variant="subtitle2"
                      color="#092435"
                    >
                      <p style={{ position: "relative", left: "30px" }}>
                        Estatura :{" "}
                      </p>
                    </Typography>
                  </Item>
                </Grid>
                <Grid item md={3} xs={6}>
                  <Item>
                    <p style={{ color: "#4A92A8" }}>{data.height + "  cm"}</p>
                  </Item>
                </Grid>{" "}
                <Grid item md={3} xs={6}>
                  <Item
                    style={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "left",
                      backgroundColor: "#BBF0E8",
                    }}
                  >
                    <Typography
                      component={"span"}
                      variant="subtitle2"
                      color="#092435"
                    >
                      <p style={{ position: "relative", left: "30px" }}>
                        IMC :{" "}
                      </p>
                    </Typography>
                  </Item>
                </Grid>
                <Grid item md={3} xs={6}>
                  <Item>
                    <p style={{ color: "#4A92A8" }}>
                      {data.idealWeight + "  cm"}
                    </p>
                  </Item>
                </Grid>{" "}
                <Grid item md={3} xs={6}>
                  <Item
                    style={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "left",
                      backgroundColor: "#BBF0E8",
                    }}
                  >
                    <Typography
                      component={"span"}
                      variant="subtitle2"
                      color="#092435"
                    >
                      <p style={{ position: "relative", left: "30px" }}>
                        Temperatura :{" "}
                      </p>
                    </Typography>
                  </Item>
                </Grid>
                <Grid item md={3} xs={6}>
                  <Item>
                    <p style={{ color: "#4A92A8" }}>{data.temp + "  °C"}</p>
                  </Item>
                </Grid>{" "}
                <Grid item md={3} xs={6}>
                  <Item
                    style={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "left",
                    }}
                  >
                    <Typography
                      component={"span"}
                      variant="subtitle2"
                      color="#092435"
                    >
                      <p style={{ position: "relative", left: "30px" }}>
                        Consumo de tabaco :{" "}
                      </p>
                    </Typography>
                  </Item>
                </Grid>
                <Grid item md={3} xs={6}>
                  <Item>
                    <p style={{ color: "#4A92A8" }}>
                      {data.tobacco == "false" ? "No" : "Si"}
                    </p>
                  </Item>
                </Grid>{" "}
                <Grid item md={3} xs={6}>
                  <Item
                    style={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "left",
                    }}
                  >
                    <Typography
                      component={"span"}
                      variant="subtitle2"
                      color="#092435"
                    >
                      <p style={{ position: "relative", left: "30px" }}>
                        Consumo de alcohol :{" "}
                      </p>
                    </Typography>
                  </Item>
                </Grid>
                <Grid item md={3} xs={6}>
                  <Item>
                    <p style={{ color: "#4A92A8" }}>
                      {data.alcohol === 0 ? "No" : "Si"}
                    </p>
                  </Item>
                </Grid>
                <Grid item md={3} xs={6}>
                  <Item
                    style={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "left",
                      backgroundColor: "#BBF0E8",
                    }}
                  >
                    <Typography
                      component={"span"}
                      variant="subtitle2"
                      color="#092435"
                    >
                      <p style={{ position: "relative", left: "30px" }}>
                        Consumo de sustancias :{" "}
                      </p>
                    </Typography>
                  </Item>
                </Grid>
                <Grid item md={3} xs={6}>
                  <Item>
                    <p style={{ color: "#4A92A8" }}>
                      {data.drugs === 0 ? "No" : "Si"}
                    </p>
                  </Item>
                </Grid>{" "}
                <Grid item md={3} xs={6}>
                  <Item
                    style={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "left",
                      backgroundColor: "#BBF0E8",
                    }}
                  >
                    <Typography
                      component={"span"}
                      variant="subtitle2"
                      color="#092435"
                    >
                      <p style={{ position: "relative", left: "30px" }}>
                        Cambios de apetito :{" "}
                      </p>
                    </Typography>
                  </Item>
                </Grid>
                <Grid item md={3} xs={6}>
                  <Item>
                    <p style={{ color: "#4A92A8" }}>
                      {data.apetiteChanges === 0 ? "No" : "Si"}
                    </p>
                  </Item>
                </Grid>{" "}
                <Grid item md={3} xs={6}>
                  <Item
                    style={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "left",
                    }}
                  >
                    <Typography
                      component={"span"}
                      variant="subtitle2"
                      color="#092435"
                    >
                      <p style={{ position: "relative", left: "30px" }}>
                        Cambios de sueño :{" "}
                      </p>
                    </Typography>
                  </Item>
                </Grid>
                <Grid item md={3} xs={6}>
                  <Item>
                    <p style={{ color: "#4A92A8" }}>
                      {data.dreamChanges === 0 ? "No" : "Si"}
                    </p>
                  </Item>
                </Grid>{" "}
                <Grid item md={3} xs={6}>
                  <Item
                    style={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "left",
                    }}
                  >
                    <Typography
                      component={"span"}
                      variant="subtitle2"
                      color="#092435"
                    >
                      <p style={{ position: "relative", left: "30px" }}>
                        Fecha de ingreso :{" "}
                      </p>
                    </Typography>
                  </Item>
                </Grid>
                <Grid item md={3} xs={6}>
                  <Item>
                    <p style={{ color: "#4A92A8" }}>{data.created_at}</p>
                  </Item>
                </Grid>
                <Grid item xs={12}>
                  <Item
                    style={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "left",
                      backgroundColor: "#BBF0E8",
                    }}
                  >
                    <Typography
                      component={"span"}
                      variant="subtitle2"
                      color="#092435"
                    >
                      <p style={{ position: "relative", left: "30px" }}>
                        Síntomas de consulta :{" "}
                      </p>
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={12}>
                  <Item
                    style={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "left",
                    }}
                  >
                    <p
                      style={{
                        position: "relative",
                        left: "30px",
                        color: "#4A92A8",
                      }}
                    >
                      {data.currentCondition}
                    </p>
                  </Item>
                </Grid>
                <Grid item xs={12}>
                  <Item
                    style={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "left",

                      backgroundColor: "#BBF0E8",
                    }}
                  >
                    <Typography
                      component={"span"}
                      variant="subtitle2"
                      color="#092435"
                    >
                      <p style={{ position: "relative", left: "30px" }}>
                        Observación :{" "}
                      </p>
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={12}>
                  <Item
                    style={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "left",
                    }}
                  >
                    <p
                      style={{
                        position: "relative",
                        left: "30px",
                        color: "#4A92A8",
                      }}
                    >
                      {data.comment}
                    </p>
                  </Item>
                </Grid>{" "}
                <Grid item xs={12}>
                  <Item
                    style={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "left",

                      backgroundColor: "#BBF0E8",
                    }}
                  >
                    <Typography
                      component={"span"}
                      variant="subtitle2"
                      color="#092435"
                    >
                      <p style={{ position: "relative", left: "30px" }}>
                        Medicamento prescrito :{" "}
                      </p>
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={12}>
                  <Item
                    style={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "left",
                    }}
                  >
                    <p
                      style={{
                        position: "relative",
                        left: "30px",
                        color: "#4A92A8",
                      }}
                    >
                      {data.currentDrug}
                    </p>
                  </Item>
                </Grid>{" "}
              </Grid>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </CssBaseline>
  );
}
