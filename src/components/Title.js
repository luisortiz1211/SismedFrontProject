import { Grid } from "@material-ui/core";
import React from "react";
import ButtonBack from "./ButtonBack";
import { CssBaseline } from "@material-ui/core";

export default function Title({ children }) {
  return (
    <>
      <CssBaseline>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={1}
          style={{ paddingTop: "10px" }}
        >
          <Grid item md={6} component={"span"}>
            <h1 component={"span"}>
              {"  "}
              {children}
            </h1>
          </Grid>

          <Grid item>
            <ButtonBack />
          </Grid>
        </Grid>
        <style jsx>
          {`
            h1 {
              margin: 0;
              font-size: 2rem;
              text-align: left;
              color: #092435;
            }
          `}
        </style>
      </CssBaseline>
    </>
  );
}
