import Loading from "@/components/Loading";
import { fetcher } from "src/api/utils";
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

export default function ExplorationPatientCard({ patientID }) {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const { data, error } = useSWR(`/exploration_patients/${patientID}`, fetcher);
  //console.log("exploracion del paciente", data);
  if (error)
    return <div> No se puede mostrar el examen físico o no contiene </div>;
  if (!data) return <Loading />;

  return (
    <Card sx={{ maxWidth: "auto" }}>
      <CardActionArea className={classes.fontcolor}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="span">
            Resultados de revisión medica
          </Typography>

          <Box sx={{ width: "100%" }}>
            <Grid container>
              <Grid item xs={12} md={3}>
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
                      Revisión de cabeza :{" "}
                    </p>
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={12} md={9}>
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
                    {data.headExplo}
                  </p>
                </Item>
              </Grid>
              <Grid item xs={12} md={3}>
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
                      Revisión de tórax y espalda :{" "}
                    </p>
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={12} md={9}>
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
                    {data.chestExplo}
                  </p>
                </Item>
              </Grid>{" "}
              <Grid item xs={12} md={3}>
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
                      Revisión de extremidades :{" "}
                    </p>
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={12} md={9}>
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
                    {data.extremitiesExplo}
                  </p>
                </Item>
              </Grid>{" "}
              <Grid item xs={12} md={3}>
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
                      Exploración de abdomen :{" "}
                    </p>
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={12} md={9}>
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
                    {data.stomachExplo}
                  </p>
                </Item>
              </Grid>{" "}
              <Grid item xs={12} md={3}>
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
                      Revisión de genitales :{" "}
                    </p>
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={12} md={9}>
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
                    {data.genitalsExplo}
                  </p>
                </Item>
              </Grid>{" "}
              <Grid item xs={12} md={3}>
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
                      Pronóstico :{" "}
                    </p>
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={12} md={9}>
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
                    {data.forecastExplo}
                  </p>
                </Item>
              </Grid>{" "}
              <Grid item xs={12} md={3}>
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
                      Diagnóstico :{" "}
                    </p>
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={12} md={9}>
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
                    {data.diagnosisExplo}
                  </p>
                </Item>
              </Grid>{" "}
              <Grid item xs={12} md={3}>
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
                      Tratamiento :{" "}
                    </p>
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={12} md={9}>
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
                    {data.treatmentExplo}
                  </p>
                </Item>
              </Grid>{" "}
              <Grid item xs={12} md={3}>
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
              <Grid item xs={12} md={9}>
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
                    {data.commentExplo}
                  </p>
                </Item>
              </Grid>{" "}
              <Grid item xs={6} md={3}>
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
                      Fecha de registro :{" "}
                    </p>
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={6} md={9}>
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
                    {data.created_at}
                  </p>
                </Item>
              </Grid>{" "}
            </Grid>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
