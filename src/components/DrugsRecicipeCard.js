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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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

export default function DrugsRecipieCard({ patientID }) {
  const classes = useStyles();

  const { data, error } = useSWR(
    `/exploration_patients/${patientID}/drugs_recipies`,
    fetcher
  );
  console.log("Receta del paciente", data);
  if (error) return <div> No se puede mostrar medicamentos o no contiene </div>;
  if (!data) return <Loading />;

  return (
    <Card sx={{ maxWidth: "auto" }}>
      <CardActionArea className={classes.fontcolor}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Medicación prescrita según exploración
          </Typography>

          <Box sx={{ width: "100%" }}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={5}>
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
                      Cantidad :{" "}
                    </p>
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={7}>
                <Item>
                  <p style={{ color: "#4A92A8" }}>{data.coddrug + "unidad"}</p>
                </Item>
              </Grid>
              <Grid item xs={5}>
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
                      Medicamento :{" "}
                    </p>
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={7}>
                <Item>
                  <p style={{ color: "#4A92A8" }}>{data.nameDrugRecipie}</p>
                </Item>
              </Grid>{" "}
              <Grid item xs={5}>
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
                      Médico por :{" "}
                    </p>
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={7}>
                <Item>
                  <p style={{ color: "#4A92A8" }}>{data.user_id}</p>
                </Item>
              </Grid>{" "}
              <Grid item xs={5}>
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
              <Grid item xs={7}>
                <Item>
                  <p>{data.data.created_at}</p>
                </Item>
              </Grid>{" "}
            </Grid>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
